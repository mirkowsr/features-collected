import { Body, Controller, Post } from '@nestjs/common'
import { ReceipentDTO } from './dto/receipent'
import { TemplateBody } from './dto/template'
import { EmailService } from './email-send.service'

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  send(@Body() receipent: ReceipentDTO) {
    return this.emailService.sendEmail(receipent)
  }

  @Post('/bulk')
  sendBulk(@Body() body: TemplateBody) {
    return this.emailService.sendBulkEmail(body)
  }
}
