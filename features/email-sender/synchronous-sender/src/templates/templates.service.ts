import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import to from 'await-to-js'
import crypto from 'crypto'
import { eq } from 'drizzle-orm'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { templates } from '../db/schema'
import { TemplateStatus } from '../db/schema/templates'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { StorageService } from '../storage/storage.service'
import { CreatedDraftDTO, TemplateUploadDTO } from './dto/template.dto'
import { ContentTypes } from '../storage/dto/storage.dto'

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name)

  constructor(
    @InjectDrizzle() private db: DrizzleSchema,
    private storageService: StorageService,
  ) {}

  async uploadTemplate({
    file,
    name,
  }: TemplateUploadDTO): Promise<CreatedDraftDTO> {
    const templateStorageKey = crypto.randomUUID()

    const { buffer, originalname } = file

    const [initialDraftError, draft] = await to(
      this.db
        .insert(templates)
        .values({
          name,
          storageKey: templateStorageKey,
          templateUploadStatus: TemplateStatus.Uploading,
        })
        .returning({ storageKey: templates.storageKey })
        .then((res) => res[0]),
    )

    if (initialDraftError || !draft) {
      this.logger.error('DB Error during template draft initialisation')
      throw new InternalServerErrorException(
        'Error during upload draft initialisation',
      )
    }

    await this.storageService.uploadTemplate({
      buffer,
      storageKey: draft.storageKey,
      contentType: ContentTypes.html,
      metadata: {
        originalname,
        fileSize: `${file.size}`,
      },
    })

    await this.setTemplateStatus(templateStorageKey, TemplateStatus.Ready)
    this.logger.log('Template uploaded in bucket and stored in db')

    return {
      storageKey: draft.storageKey,
      name,
    }
  }

  async setTemplateStatus(
    templateStorageKey: string,
    templateUploadStatus: TemplateStatus,
  ) {
    await this.db
      .update(templates)
      .set({ templateUploadStatus })
      .where(eq(templates.storageKey, templateStorageKey))
  }
}
