import { Module } from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileUploadController } from './file-upload.controller'
import { RetryService } from '../retry-service/retry-service'

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, RetryService],
})
export class FileUploadModule {}
