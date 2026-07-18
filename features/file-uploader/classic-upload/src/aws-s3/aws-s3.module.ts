import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3Client } from '@aws-sdk/client-s3'

export const S3_CLIENT = Symbol('s3-client')

@Global()
@Module({
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new S3Client({
          endpoint: config.getOrThrow('AWS_ENDPOINT'),
          region: config.getOrThrow('AWS_REGION'),
          credentials: {
            accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
            secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
          },
          forcePathStyle: true,
        }),
    },
  ],
  exports: [S3_CLIENT],
})
export class AwsS3Module {}
