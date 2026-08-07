import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import crypto from 'crypto'
import { eq } from 'drizzle-orm'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { templates } from '../db/schema'
import { TemplateStatus } from '../db/schema/templates'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { CreatedDraftDTO, CreateTemplateDTO } from './dto/template.dto'
import to from 'await-to-js'
import { MIMEType } from 'util'

@Injectable()
export class TemplatesService {
  BUCKET_NAME = ''

  constructor(
    @InjectS3() private s3: S3Client,
    @InjectDrizzle() private db: DrizzleSchema,
    config: ConfigService,
  ) {
    this.BUCKET_NAME = config.getOrThrow('S3_BUCKET_NAME')
  }

  async uploadTemplate(
    templateToUpload: CreateTemplateDTO,
  ): Promise<CreatedDraftDTO> {
    const templateStorageKey = crypto.randomUUID()
    const { file, name } = templateToUpload

    const { buffer } = file

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
      throw new InternalServerErrorException(
        'Error during upload draft initialisation',
      )
    }

    const [uploadError] = await to(
      this.s3.send(
        new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: `${templateStorageKey}`,
          Body: buffer,
          ContentType: 'text/html',
          Metadata: {
            originalFileName: file.originalname,
            size: `${file.size}`,
            MIMEType: file.mimetype,
          },
        }),
      ),
    )

    if (uploadError) {
      await this.setTemplateStatus(templateStorageKey, TemplateStatus.Failed)
      throw new InternalServerErrorException(
        'Error during upload template to Bucket',
      )
    }

    await this.setTemplateStatus(templateStorageKey, TemplateStatus.Ready)

    return {
      storageKey: draft.storageKey,
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
