import {
  Controller,
  HttpStatus,
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

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
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
    return this.fileUploadService.upload(file)
  }
}
