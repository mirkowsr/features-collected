import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SqsProducerService } from '@repo/backend-aws-sqs'

import { createQueueEvent } from '../common/events/createQueueEvent'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { users } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'

@Injectable()
export class UsersService {
  private readonly queueUrl: string

  constructor(
    @InjectDrizzle() private db: DrizzleSchema,
    private readonly producer: SqsProducerService,
    config: ConfigService,
  ) {
    this.queueUrl = config.getOrThrow('SQS_QUEUE_URL')
  }

  async createUser(name: string) {
    const event = createQueueEvent('user.created', { name })
    await this.producer.send({
      queueUrl: this.queueUrl,
      message: event,
    })

    return { queued: true }
  }

  async findAll() {
    return await this.db.select().from(users)
  }
}
