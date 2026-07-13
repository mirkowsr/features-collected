import { Injectable } from '@nestjs/common'
import { InjectS3 } from '../aws-s3'
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class FileProcessService {
  PROCESSED_BUCKET_NAME = ''
  STAGING_BUCKET_NAME = ''
  constructor(
    @InjectS3() private s3: S3Client,
    config: ConfigService,
  ) {
    this.STAGING_BUCKET_NAME = config.getOrThrow('S3_STAGING_BUCKET_NAME')
    this.PROCESSED_BUCKET_NAME = config.getOrThrow('S3_PROCESSED_BUCKET_NAME')
  }

  async getFileToProcess(fileId: string) {
    const result = await this.s3.send(
      new GetObjectCommand({
        Key: fileId,
        Bucket: this.STAGING_BUCKET_NAME,
      }),
    )

    const buffer = await result.Body?.transformToByteArray()
    const contentType = result.ContentType ?? 'application/octet-stream'
    const originalName = result.Metadata?.originalname ?? fileId

    return { buffer, contentType, originalName }
  }

  async uploadToBucket(
    file: {
      buffer: Uint8Array<ArrayBufferLike> | undefined
      contentType: string
      originalName: string
      fileId: string
    },
    bucket: string,
  ): Promise<string> {
    const { fileId, ...restFile } = file

    await this.s3.send(
      new PutObjectCommand({
        ...restFile,
        Bucket: bucket,
        Key: file.fileId,
      }),
    )

    return fileId
  }

  async mimicFileProcessing(): Promise<void> {
    return new Promise((res) => setTimeout(res, 5000))
  }

  async processStaggingFile(fileId: string) {
    const file = await this.getFileToProcess(fileId)

    await this.mimicFileProcessing()

    const uploadedFileId = await this.uploadToBucket(
      { ...file, fileId },
      this.PROCESSED_BUCKET_NAME,
    )

    return { uploadedFileId }
  }
}
