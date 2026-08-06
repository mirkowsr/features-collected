import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { templates } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { TemplateDTO } from './dto/template.dto'

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

  async uploadTemplate(template: TemplateDTO) {
    const { file } = template
    const { buffer } = file

    const [dbTemplate] = await this.db
      .insert(templates)
      .values({ name: template.name })
      .returning()

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: `templates/${dbTemplate?.id}`,
          Body: buffer,
          ContentType: 'text/html',
          Metadata: {
            originalFileName: file.originalname,
            size: `${file.size}`,
          },
        }),
      )
    } catch (e) {
      throw new InternalServerErrorException(
        'Error during upload template to Bucket',
      )
    }

    return dbTemplate
  }
}
