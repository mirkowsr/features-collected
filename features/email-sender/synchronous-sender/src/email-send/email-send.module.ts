import { Module } from '@nestjs/common'
import { EmailService } from './email-send.service'
import { EmailSendController } from './email-send.controller'
import { StorageModule } from '../storage/storage.module'

@Module({
  controllers: [EmailSendController],
  providers: [EmailService],
  imports: [StorageModule],
})
export class EmailSender {}
