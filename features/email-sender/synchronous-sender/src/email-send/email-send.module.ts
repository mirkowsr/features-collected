import { Module } from '@nestjs/common'
import { EmailService } from './email-send.service'
import { EmailSendController } from './email-send.controller'

@Module({
  controllers: [EmailSendController],
  providers: [EmailService],
})
export class EmailSender {}
