import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './users/users.module'
import { DrizzleModule } from './db/drizzle.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
  ],
  controllers: [],
})
export class AppModule {}
