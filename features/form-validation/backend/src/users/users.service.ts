import { Injectable } from '@nestjs/common'
import { UserDto } from './validation/user'
import { DrizzleModule } from '../db/drizzle.module'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { users } from '../db/schema'

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
