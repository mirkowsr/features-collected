import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module'
import { FileProcessModule } from './file-process/file-process.module'
import { AwsS3Module } from './aws-s3'

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
