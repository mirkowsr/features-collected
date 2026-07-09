import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { UploadStatus } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { FileUploadResponseDto } from './dto/status.dto'

@Injectable()
export class FileUploadService {
  AWS_REGION: string = ''
  BUCKET_NAME: string = ''

  constructor(
    @InjectS3() private s3: S3Client,
    @InjectDrizzle() private db: DrizzleSchema,
    private config: ConfigService,
  ) {
    this.AWS_REGION = this.config.getOrThrow('AWS_REGION')
    this.BUCKET_NAME = this.config.getOrThrow('S3_STAGING_BUCKET_NAME')
  }

  async upload(file: Express.Multer.File): Promise<FileUploadResponseDto> {
    const { buffer, mimetype, originalname } = file
    const fileId = crypto.randomUUID()

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

    return { status: UploadStatus.pending }
  }
}
