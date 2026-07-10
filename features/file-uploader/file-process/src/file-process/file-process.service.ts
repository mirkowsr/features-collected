import { Injectable } from '@nestjs/common'

@Injectable()
export class FileProcessService {
  findAll() {
    return { hello: 'world' }
  }
}
