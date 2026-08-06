import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectS3 } from '../aws-s3'
import { TemplateDTO } from './dto/template.dto'

@Injectable()
export class TemplatesService {
  BUCKET_NAME = ''

  constructor(
    @InjectS3() private s3: S3Client,
    config: ConfigService,
  ) {
    this.BUCKET_NAME = config.getOrThrow('S3_BUCKET_NAME')
  }

  async uploadTemplate(template: TemplateDTO) {
    const { file } = template
    const { buffer } = file

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.BUCKET_NAME,
        Key: `templates/${template.name}`,
        Body: buffer,
        ContentType: 'text/html',
      }),
    )
  }
}
