import { Injectable } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { users } from '../db/schema'

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async findAll() {
    return await this.db.select().from(users)
  }
}
