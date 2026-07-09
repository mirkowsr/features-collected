import { Injectable } from '@nestjs/common'

@Injectable()
export class SimpleQueueService {
  findAll() {
    return { hello: 'world' }
  }
}
