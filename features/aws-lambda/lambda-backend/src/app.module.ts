import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppLoggerModule } from '@repo/backend-logging'

import { AwsSQSModule } from './aws-sqs'
import { DrizzleModule } from './db/drizzle.module'
import { ExampleJobModule } from './example-job/example-job.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
    AppLoggerModule,
    ExampleJobModule,
    AwsSQSModule,
  ],
  controllers: [],
})
export class AppModule {}
