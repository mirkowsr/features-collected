import { Injectable } from '@nestjs/common'

@Injectable()
export class UplaodQueueService {
  findAll() {
    return { hello: 'world' }
  }
}
