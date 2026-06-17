import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from './pipes/validation'
import { UsersService } from './users.service'
import { UserDto, UserSchema } from './validation/user'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(UserSchema))
  create(@Body() user: UserDto) {
    return this.usersService.create(user)
  }
}
