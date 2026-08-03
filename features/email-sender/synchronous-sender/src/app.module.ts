import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DrizzleModule } from './db/drizzle.module'
import { MailerModule } from './mailer/mailer.module'
import { RegisterModule } from './register/register.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    MailerModule,
    RegisterModule,
  ],
})
export class AppModule {}
