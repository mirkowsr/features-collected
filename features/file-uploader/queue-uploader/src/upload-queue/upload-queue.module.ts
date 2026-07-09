import { Module } from '@nestjs/common'
import { UplaodQueueService } from './upload-queue.service'
import { UploadQueueController } from './upload-queue.controller'

@Module({
  controllers: [UploadQueueController],
  providers: [UplaodQueueService],
})
export class UploadQueueModule {}
