import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SQSClient } from '@aws-sdk/client-sqs'

export const SQS_CLIENT = Symbol('sqs-client')

@Global()
@Module({
  providers: [
    {
      provide: SQS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new SQSClient({
          region: 'us-east-1',
          endpoint: 'http://localhost:4566',
          credentials: {
            accessKeyId: 'test',
            secretAccessKey: 'test',
          },
          // region: config.getOrThrow<string>('us-east-1'),
          // endpoint: config.get<string>('http://localhost:4566'),
          // credentials: {
          //   accessKeyId: config.getOrThrow<string>('test'),
          //   secretAccessKey: config.getOrThrow<string>('test'),
          // },
        }),
    },
  ],
  exports: [SQS_CLIENT],
})
export class AwsSQSModule {}
