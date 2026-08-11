import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { TemplateBodyDTO } from './dto/template.dto'
import { FileTypeValidationPipe } from './pipes/fileType.pipe'
import { ZodValidationPipe } from './pipes/validation'
import { TemplatesService } from './templates.service'
import { TemplateBodySchema } from './validation-schema/template.schema'

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
    @Body(new ZodValidationPipe(TemplateBodySchema)) fileData: TemplateBodyDTO,
  ) {
    return this.templatesService.uploadTemplate({ name: fileData.name, file })
  }
}
