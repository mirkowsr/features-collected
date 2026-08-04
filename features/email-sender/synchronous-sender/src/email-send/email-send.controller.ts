import { Controller, Post } from '@nestjs/common'
import { EmailService } from './email-send.service'

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  register() {
    this.emailService.sendEmail()
  }
}
