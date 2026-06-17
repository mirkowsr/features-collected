import { Injectable } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { time_limits } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { TimeLimitDto } from './validation/time-limits'

@Injectable()
export class TimeLimitsService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}
  findMany() {
    return this.db.select().from(time_limits)
  }
  async create(createTimeLimit: TimeLimitDto) {
    const [limit] = await this.db
      .insert(time_limits)
      .values(createTimeLimit)
      .onConflictDoUpdate({
        target: [time_limits.resource_type, time_limits.resource_id],
        set: { valid_till: createTimeLimit.valid_till },
      })
      .returning()

    return limit
  }
}
