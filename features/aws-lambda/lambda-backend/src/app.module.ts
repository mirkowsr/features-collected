import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { DrizzleModule } from './db/drizzle.module'
import { ExampleJobModule } from './example-job/example-job.module'
import { AppLoggerModule } from './common/logger/logger.module'
import { AwsSQSModule } from './aws-sqs'

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
