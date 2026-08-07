import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { TemplatesService } from './templates.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateTemplateDTO } from './dto/template.dto'
import { FileTypeValidationPipe } from './pipes/fileType.pipe'

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('template'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidationPipe({
            allowedMimeTypes: ['text/html'],
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Body() templateMetadata: { name: string },
  ) {
    const template: CreateTemplateDTO = { file, name: templateMetadata.name }

    return this.templatesService.uploadTemplate(template)
  }
}
