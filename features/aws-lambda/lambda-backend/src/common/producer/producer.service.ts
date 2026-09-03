import { Injectable, Logger } from '@nestjs/common'
import { InjectSQS } from '../../aws-sqs'
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ProducerService {
  // private readonly QUEUE_URL = this.config.getOrThrow('SQS_QUEUE_URL')
  private readonly logger = new Logger(ProducerService.name)

  constructor(
    @InjectSQS() private readonly sqs: SQSClient,
    private readonly config: ConfigService,
  ) {}

  async emit() {
    this.logger.log('sending message to terraform queue')

    await this.sqs.send(
      new SendMessageCommand({
        QueueUrl: 'http://ministack:4566/000000000000/terraform_queue',
        MessageBody: JSON.stringify({
          type: 'user.created',
          payload: { name: 'John' },
        }),
      }),
    )
  }
}
