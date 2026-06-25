import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { SimpleQueueService } from './simple-queue.service'

@Controller()
export class SimpleQueueController {
  constructor(private readonly simpleQueueService: SimpleQueueService) {}

  @MessagePattern('receiveMessage')
  findAll() {
    return this.simpleQueueService.findAll()
  }
}
