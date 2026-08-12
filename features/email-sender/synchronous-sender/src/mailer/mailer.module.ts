import {
  MailerOptions,
  MailerModule as NestMailer,
} from '@nestjs-modules/mailer'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [
    NestMailer.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MailerOptions => ({
        transport: {
          host: configService.getOrThrow<string>('SMTP_HOST'),
          port: Number(configService.getOrThrow<string>('SMTP_PORT')),
          secure: false,
        },
        defaults: {},
      }),
    }),
  ],
  exports: [NestMailer],
})
export class MailerModule {}
