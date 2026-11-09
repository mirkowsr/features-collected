import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'

import { ZodValidationPipe } from '@repo/backend-validation'

import { UsersService } from './users.service'
import { CreateUserSchema, type CreateUserBody } from './validation/users'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  createUser(@Body() body: CreateUserBody) {
    return this.usersService.createUser(body.name)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }
}
