import { SendMessageCommand, type SQSClient } from '@aws-sdk/client-sqs'
import { Injectable } from '@nestjs/common'

import { InjectSQS } from './aws-sqs.decorator'

export interface SqsSendOptions {
  delaySeconds?: number
  messageGroupId?: string
  messageDeduplicationId?: string
}

export interface SqsSendInput<TMessage> extends SqsSendOptions {
  queueUrl: string
  message: TMessage
}

@Injectable()
export class SqsProducerService {
  constructor(@InjectSQS() private readonly sqs: SQSClient) {}

  async send<TMessage>({
    queueUrl,
    message,
    ...options
  }: SqsSendInput<TMessage>): Promise<void> {
    const messageToSend =
      typeof message === 'string' ? message : JSON.stringify(message)

    await this.sqs.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: messageToSend,
        DelaySeconds: options.delaySeconds,
        MessageGroupId: options.messageGroupId,
        MessageDeduplicationId: options.messageDeduplicationId,
      }),
    )
  }
}
