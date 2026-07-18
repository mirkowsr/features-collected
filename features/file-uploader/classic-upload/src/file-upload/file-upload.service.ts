import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { files, UploadStatus, UploadStatusTypes } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { RetryService } from '../retry-service/retry-service'
import { FileDto } from './dto/file.dto'

@Injectable()
export class FileUploadService {
  AWS_REGION: string = ''
  BUCKET_NAME: string = ''

  constructor(
    @InjectS3() private s3: S3Client,
    @InjectDrizzle() private db: DrizzleSchema,
    private config: ConfigService,
    private retryService: RetryService,
  ) {
    this.AWS_REGION = this.config.getOrThrow('AWS_REGION')
    this.BUCKET_NAME = this.config.getOrThrow('S3_BUCKET_NAME')
  }
  private buildFileUrl(fileName: string) {
    const template = this.config.get(
      'S3_URL_TEMPLATE',
      'https://${bucket}.s3.${region}.amazonaws.com/${key}',
    )
    return template
      .replace('${bucket}', this.BUCKET_NAME)
      .replace('${region}', this.AWS_REGION)
      .replace('${key}', fileName)
  }

  private async insertFileData(
    file: Express.Multer.File,
    fileMetaData: { url: string; status: UploadStatusTypes },
  ) {
    const { mimetype, size, originalname } = file
    const { url } = fileMetaData

    await this.db.insert(files).values({
      mime_type: mimetype,
      url,
      upload_date: new Date(),
      file_size: size,
      upload_status: UploadStatus.finished,
      original_name: originalname,
    })
  }

  async upload(file: Express.Multer.File): Promise<FileDto> {
    const { buffer, mimetype, originalname } = file
    const fileId = crypto.randomUUID()
    const url = this.buildFileUrl(fileId)

    await this.retryService.execute(async () => {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: fileId,
          Body: buffer,
          ContentType: mimetype,
          Metadata: {
            originalname,
          },
        }),
      )
      await this.insertFileData(file, { url, status: UploadStatus.finished })
    })

    return { url, fileId, originalname }
  }
}
