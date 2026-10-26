import { Injectable } from '@nestjs/common'

import { createQueueEvent } from '../common/events/createQueueEvent'
import { ProducerService } from '../common/producer/producer.service'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { users } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'

@Injectable()
export class UsersService {
  constructor(
    @InjectDrizzle() private db: DrizzleSchema,
    private readonly producer: ProducerService,
  ) {}

  async createUser(name: string) {
    const event = createQueueEvent('user.created', { name })
    await this.producer.emit(event)

    return { queued: true }
  }

  async findAll() {
    return await this.db.select().from(users)
  }
}
