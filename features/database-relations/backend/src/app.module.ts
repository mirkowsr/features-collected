import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { DrizzleModule } from './db/drizzle.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DrizzleModule],
  controllers: [AppController],
})
export class AppModule {}
