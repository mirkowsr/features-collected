import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './users/users.module'
import { DrizzleModule } from './db/drizzle.module'
import { ExampleJobModule } from './example-job/example-job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
    ExampleJobModule,
  ],
  controllers: [],
})
export class AppModule {}
