import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RabbitMqGlobalModule } from './rabbit-mq/rabbit-mq-global.module'
import { DrizzleModule } from './db/drizzle.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { AwsS3Module } from './aws-s3'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    RabbitMqGlobalModule,
    FileUploadModule,
    AwsS3Module,
  ],
  controllers: [],
})
export class AppModule {}
