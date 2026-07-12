import {
  Controller,
  HttpStatus,
  Inject,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileSizeValidationPipe } from '../pipes/fileSize.pipe'
import { fileSizeMiB } from './utils/file.utils'
import { FileTypeValidationPipe } from '../pipes/fileType.pipe'
import { ClientProxy, EventPattern } from '@nestjs/microservices'
import { UploadStatus } from '../db/schema'

@Controller('file')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    @Inject('RABBIT_CLIENT') private RabbitMQ: ClientProxy,
  ) {}

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
  async onProcessFinish(data: { fileId: string }) {
    console.log('@@@@@@@@@@@', data.fileId)

    await this.fileUploadService.updateStatus(
      data.fileId,
      UploadStatus.finished,
    )
  }
}
