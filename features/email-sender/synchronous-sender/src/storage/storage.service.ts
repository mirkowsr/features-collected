import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import to from 'await-to-js'
import { InjectS3 } from '../aws-s3'
import { UploadTemplateDTO } from './dto/storage.dto'

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name)
  BUCKET_NAME = ''

  constructor(
    @InjectS3() private s3: S3Client,
    private config: ConfigService,
  ) {
    this.BUCKET_NAME = this.config.getOrThrow('S3_BUCKET_NAME')
  }

  async getEmailTemplate(templateKey: string) {
    const [getTemplateError, template] = await to(
      this.s3.send(
        new GetObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: `templates/${templateKey}`,
        }),
      ),
    )

    if (getTemplateError || !template?.Body) {
      this.logger.error(
        `Error during mail template retreive from bucket. Template key: ${templateKey}, error: ${getTemplateError}`,
      )
      throw new InternalServerErrorException(getTemplateError)
    }

    return template.Body.transformToString()
  }

  async uploadTemplate({
    storageKey,
    buffer,
    contentType,
    metadata,
  }: UploadTemplateDTO) {
    const [uploadTemplateError] = await to(
      this.s3.send(
        new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: `templates/${storageKey}`,
          Body: buffer,
          ContentType: contentType,
          Metadata: { ...metadata },
        }),
      ),
    )

    if (uploadTemplateError) {
      throw new InternalServerErrorException('Error while uploading template')
    }
  }
}
