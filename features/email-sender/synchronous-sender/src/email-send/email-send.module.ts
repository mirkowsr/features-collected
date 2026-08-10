import { Module } from '@nestjs/common'
import { EmailSendService } from './email-send.service'
import { EmailSendController } from './email-send.controller'
import { StorageModule } from '../storage/storage.module'

@Module({
  controllers: [EmailSendController],
  providers: [EmailSendService],
  imports: [StorageModule],
})
export class EmailSender {}
