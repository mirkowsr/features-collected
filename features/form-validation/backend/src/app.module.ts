import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DrizzleModule } from './db/drizzle.module'
import { UsersModule } from './users/users.module'
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
    ValidationModule,
  ],
  controllers: [],
})
export class AppModule {}
