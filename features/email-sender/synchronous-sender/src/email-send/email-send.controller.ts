import { Body, Controller, Post } from '@nestjs/common'
import { EmailService } from './email-send.service'
import { statusEnum } from '../db/schema'
import { ReceipentDTO } from './dto/receipent'

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  send(@Body() receipent: ReceipentDTO) {
    this.emailService.sendEmail(receipent)
  }

  @Post('/bulk')
  sendBulk() {
    this.emailService.sendBulkEmail()
  }
}
