import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import type { RecipientDTO } from './dto/recipient'
import { EmailSendService } from './email-send.service'
import type { TemplateBody } from './dto/template'
import { ZodValidationPipe } from '../common/pipes/validation'
import { EmailSendSchema } from './validation-schema/email-send'
import { BulkSendSchema } from './validation-schema/bulk-send'

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emailService: EmailSendService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(EmailSendSchema))
  send(@Body() recipient: RecipientDTO) {
    return this.emailService.sendEmail(recipient)
  }

  @Post('/bulk')
  @UsePipes(new ZodValidationPipe(BulkSendSchema))
  sendBulk(@Body() body: TemplateBody) {
    return this.emailService.sendBulkEmail(body)
  }
}
