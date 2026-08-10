import { Body, Controller, Post } from '@nestjs/common'
import type { RecipientDTO } from './dto/recipient'
import { EmailSendService } from './email-send.service'
import type { TemplateBody } from './dto/template'

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emailService: EmailSendService) {}

  @Post()
  send(@Body() recipient: RecipientDTO) {
    return this.emailService.sendEmail(recipient)
  }

  @Post('/bulk')
  sendBulk(@Body() body: TemplateBody) {
    return this.emailService.sendBulkEmail(body)
  }
}
