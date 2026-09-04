import { Injectable, Logger } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { users } from '../db/schema'
import type { QueueEvent } from '../common/events/event.type'

@Injectable()
export class ExampleJobService {
  private readonly logger = new Logger(ExampleJobService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async process(body: string): Promise<void> {
    const message = JSON.parse(body) as QueueEvent

    switch (message.type) {
      case 'user.created': {
        this.logger.log(
          { event: 'user.created', name: message.payload.name },
          'user.created.processed',
        )

        await this.db.insert(users).values({
          id: crypto.randomUUID(),
          name: message.payload.name ?? 'unknown',
        })
        return
      }
      default:
        throw new Error(`Unknown message type: ${message.type}`)
    }
  }
}
