import { Controller, Inject } from '@nestjs/common'
import { ClientProxy, EventPattern } from '@nestjs/microservices'
import { FileDto } from './dto/file.dto'
import { FileProcessService } from './file-process.service'

@Controller()
export class FileProcessController {
  constructor(
    private readonly fileProcessService: FileProcessService,
    @Inject('FILE_UPLOAD_QUEUE') private facadeQueue: ClientProxy,
  ) {}

  @EventPattern('file.process')
  async process(data: FileDto) {
    const res = await this.fileProcessService.processStaggingFile(data.fileId)

    this.facadeQueue.emit('file.process.finished', {
      fileId: res.uploadedFileId,
    })
  }
}
