import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { FileProcessService } from './file-process.service'

@Controller()
export class FileProcessController {
  constructor(private readonly fileProcessService: FileProcessService) {}

  @EventPattern('file.process')
  findAll() {
    console.log('@@@@ process ')
    return this.fileProcessService.findAll()
  }
}
