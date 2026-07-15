import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { files, UploadStatus, UploadStatusTypes } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { FileUploadResponseDto } from './dto/status.dto'
import { eq } from 'drizzle-orm'

@Injectable()
export class FileUploadService {
  BUCKET_NAME: string = ''

  constructor(
    @InjectS3() private s3: S3Client,
    @InjectDrizzle() private db: DrizzleSchema,
    private config: ConfigService,
  ) {
    this.BUCKET_NAME = this.config.getOrThrow('S3_STAGING_BUCKET_NAME')
  }

  async uploadToBucket(
    fileId: string,
    buffer: Buffer<ArrayBufferLike>,
    mimetype: string,
    originalname: string,
  ) {
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
  }

  async updateFileUploadStatus(fileId: string, status: UploadStatusTypes) {
    await this.db
      .update(files)
      .set({ upload_status: status })
      .where(eq(files.id, fileId))
  }

  async upload(file: Express.Multer.File): Promise<FileUploadResponseDto> {
    const { buffer, mimetype, originalname, size } = file
    const fileId = crypto.randomUUID()

    await this.db.insert(files).values({
      id: fileId,
      mime_type: mimetype,
      file_size: size,
      upload_status: UploadStatus.pending,
      upload_date: new Date(),
      original_name: originalname,
    })

    try {
      await this.uploadToBucket(fileId, buffer, mimetype, originalname)
    } catch (e) {
      await this.updateFileUploadStatus(fileId, UploadStatus.error)
      throw new HttpException(
        'upload error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      )
    }

    return { status: UploadStatus.pending, fileId }
  }
}
