import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AwsS3Module } from '@repo/backend-aws-s3'

import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module'
import { FileProcessModule } from './file-process/file-process.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMqModule,
    FileProcessModule,
    AwsS3Module,
  ],
  controllers: [],
})
export class AppModule {}
