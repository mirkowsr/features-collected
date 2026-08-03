import { ConfigService } from '@nestjs/config'
import { Global, Module } from '@nestjs/common'
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter'

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MailerOptions => ({
        transport: {
          host: configService.getOrThrow<string>('SMTP_HOST'),
          port: Number(configService.getOrThrow<string>('SMTP_PORT')),
          secure: false,
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
})
export class Mailer {}
