import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { InjectSQS } from '../../aws-sqs'

@Injectable()
export class ProducerService {
  private readonly queueUrl = this.config.getOrThrow('SQS_QUEUE_URL')
  private readonly logger = new Logger(ProducerService.name)

  constructor(
    @InjectSQS() private readonly sqs: SQSClient,
    private readonly config: ConfigService,
  ) {}

  async emit() {
    this.logger.log('sending message to terraform queue')

    await this.sqs.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify({
          type: 'user.created',
          payload: { name: 'John' },
        }),
      }),
    )
  }
}
