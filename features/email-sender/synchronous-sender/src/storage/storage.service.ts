import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectS3 } from '../aws-s3'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
import to from 'await-to-js'

@Injectable()
export class StorageService {
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
      throw new InternalServerErrorException(getTemplateError)
    }

    return template.Body.transformToString()
  }
}
