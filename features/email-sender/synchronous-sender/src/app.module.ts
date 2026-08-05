import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DrizzleModule } from './db/drizzle.module'
import { MailerModule } from './mailer/mailer.module'
import { EmailSender } from './email-send/email-send.module'
import { AwsS3Module } from './aws-s3'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    MailerModule,
    EmailSender,
    AwsS3Module,
  ],
})
export class AppModule {}
