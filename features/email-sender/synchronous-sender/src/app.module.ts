import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DrizzleModule } from './db/drizzle.module'
import { Mailer } from './mailer/mailer.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DrizzleModule, Mailer],
})
export class AppModule {}
