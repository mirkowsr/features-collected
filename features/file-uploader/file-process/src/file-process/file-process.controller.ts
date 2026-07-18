import { Controller, Inject } from '@nestjs/common'
import { ClientProxy, EventPattern } from '@nestjs/microservices'
import { FileDto } from './dto/file.dto'
import { FileProcessService } from './file-process.service'
import { toErrorMessage } from './utils/toErrorMessage'

@Controller()
export class FileProcessController {
  constructor(
    private readonly fileProcessService: FileProcessService,
    @Inject('FILE_UPLOAD_QUEUE') private fileUploadQueue: ClientProxy,
  ) {}

  @EventPattern('file.process')
  async processFile(data: FileDto) {
    try {
      const res = await this.fileProcessService.processStaggingFile(data.fileId)

      this.fileUploadQueue.emit('file.process.finished', {
        fileId: res.uploadedFileId,
      })
    } catch (e) {
      this.fileUploadQueue.emit('file.process.error', {
        fileId: data.fileId,
        reason: toErrorMessage(e),
      })
    }
  }
}
