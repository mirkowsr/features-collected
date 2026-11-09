import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AwsS3Module } from '@repo/backend-aws-s3'

import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module'
import { DrizzleModule } from './db/drizzle.module'
import { FileUploadModule } from './file-upload/file-upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    RabbitMqModule,
    FileUploadModule,
    AwsS3Module,
  ],
  controllers: [],
})
export class AppModule {}
