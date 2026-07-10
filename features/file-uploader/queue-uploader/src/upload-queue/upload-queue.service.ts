import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadQueueService {
  findAll() {
    return { hello: 'world' }
  }
}
