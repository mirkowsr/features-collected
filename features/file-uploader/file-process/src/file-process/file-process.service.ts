import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectS3 } from '../aws-s3'
import { toErrorMessage } from './utils/toErrorMessage'

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
    if (!buffer) {
      throw new Error(`File with id: ${fileId} not found in stagging bucket`)
    }

    const contentType = result.ContentType ?? 'application/octet-stream'
    const originalName = result.Metadata?.originalname ?? fileId

    return { buffer, contentType, originalName }
  }

  async uploadToBucket(
    file: {
      buffer: Uint8Array<ArrayBufferLike>
      contentType: string
      originalName: string
      fileId: string
    },
    bucket: string,
  ): Promise<string> {
    const { fileId, ...restFile } = file

    try {
      await this.s3.send(
        new PutObjectCommand({
          ...restFile,
          Bucket: bucket,
          Key: file.fileId,
        }),
      )
    } catch (e) {
      throw new Error(
        `File with id: ${fileId} upload error: ${toErrorMessage(e)}`,
      )
    }

    return fileId
  }

  async mimicFileProcessing(): Promise<void> {
    // no need to try-catch it, it is just mimic
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
