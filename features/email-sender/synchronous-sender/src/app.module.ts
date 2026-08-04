import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DrizzleModule } from './db/drizzle.module'
import { MailerModule } from './mailer/mailer.module'
import { EmailSender } from './email-send/email-send.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    MailerModule,
    EmailSender,
  ],
})
export class AppModule {}
