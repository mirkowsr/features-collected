import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name)

  constructor() {}

  emit() {
    this.logger.log('hello')
  }
}
