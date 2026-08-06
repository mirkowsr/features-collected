import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { TemplatesService } from './templates.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { TemplateDTO } from './dto/template.dto'

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('template'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() templateMetadata: { name: string },
  ) {
    const template: TemplateDTO = { file, name: templateMetadata.name }

    this.templatesService.uploadTemplate(template)
  }
}
