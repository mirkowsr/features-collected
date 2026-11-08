import { SQSClient } from '@aws-sdk/client-sqs'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { SQS_CLIENT } from './aws-sqs.constants'
import { SqsProducerService } from './aws-sqs.producer'

@Global()
@Module({
  providers: [
    {
      provide: SQS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new SQSClient({
          region: config.getOrThrow<string>('AWS_REGION'),
          endpoint: config.get<string>('SQS_ENDPOINT'),
          credentials: {
            accessKeyId: config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
          },
        }),
    },
    SqsProducerService,
  ],
  exports: [SQS_CLIENT, SqsProducerService],
})
export class AwsSQSModule {}
