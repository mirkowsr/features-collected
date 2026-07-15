import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy, EventPattern } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadStatus } from '../db/schema'
import { FileSizeValidationPipe } from '../pipes/fileSize.pipe'
import { FileTypeValidationPipe } from '../pipes/fileType.pipe'
import { FileUploadService } from './file-upload.service'
import { fileSizeMiB } from './utils/file.utils'
import { FileProcessErrorDto, FileProcessFinishDto } from './dto/file.dto'

@Controller('files')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    @Inject('FILE_PROCESS') private RabbitMQ: ClientProxy,
  ) {}

  @Get()
  getFiles() {
    return this.fileUploadService.findFiles()
  }

  @Get(':id')
  getFile(@Param('id') id: string) {
    return this.fileUploadService.findFileById(id)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileSizeValidationPipe({ maxSize: fileSizeMiB(5) }),
          new FileTypeValidationPipe({
            allowedMimeTypes: ['image/jpeg', 'image/png'],
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    const res = await this.fileUploadService.upload(file)

    this.RabbitMQ.emit('file.process', { fileId: res.fileId })

    return res
  }

  @EventPattern('file.process.finished')
  async onFileProcessFinish(data: FileProcessFinishDto) {
    await this.fileUploadService.updateFileUploadStatus(
      data.fileId,
      UploadStatus.finished,
    )
  }

  @EventPattern('file.process.error')
  async onFileProcessError(data: FileProcessErrorDto) {
    await this.fileUploadService.updateFileUploadStatus(
      data.fileId,
      UploadStatus.error,
      data.reason,
    )
  }
}
