import { Module } from '@nestjs/common'
import { UploadQueueService } from './upload-queue.service'
import { UploadQueueController } from './upload-queue.controller'

@Module({
  controllers: [UploadQueueController],
  providers: [UploadQueueService],
})
export class UploadQueueModule {}
