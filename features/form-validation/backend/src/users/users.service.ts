import { Injectable } from '@nestjs/common'

import { InjectDrizzle } from '../db/drizzle.decorator'
import { users } from '../db/schema'
import type { DrizzleSchema } from '../db/types/drizzle.type'

import type { UserDto } from './validation/user'

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async create(createUserDto: UserDto) {
    const [user] = await this.db
      .insert(users)
      .values({
        name: createUserDto.name,
        last_name: createUserDto.lastName,
        email: createUserDto.email,
      })
      .returning()

    return user
  }
}
