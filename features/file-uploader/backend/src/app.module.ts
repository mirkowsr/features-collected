import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AwsS3Module } from './aws-s3/aws-s3.module'
import { DrizzleModule } from './db/drizzle.module'
import { FileUploadModule } from './file-upload/file-upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AwsS3Module,
    FileUploadModule,
  ],
  controllers: [],
})
export class AppModule {}
