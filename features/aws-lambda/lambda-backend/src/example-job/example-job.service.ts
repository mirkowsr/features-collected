import { Injectable, Logger } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { users } from '../db/schema'

@Injectable()
export class ExampleJobService {
  private readonly logger = new Logger(ExampleJobService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async process(body: string): Promise<void> {
    const message = JSON.parse(body) as {
      type: string
      payload: { name?: string }
    }

    switch (message.type) {
      case 'user.created': {
        this.logger.log(`Processing user.created: ${message.payload.name}`)
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
