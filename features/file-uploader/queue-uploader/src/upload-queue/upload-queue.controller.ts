import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { UploadQueueService } from './upload-queue.service'

@Controller()
export class UploadQueueController {
  constructor(private readonly simpleQueueService: UploadQueueService) {}

  @EventPattern('file.process')
  findAll() {
    console.log('@@@@ process ')
    return this.simpleQueueService.findAll()
  }
}
