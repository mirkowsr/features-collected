import { Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { ProducerService } from '../common/producer/producer.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly producerService: ProducerService,
  ) {}

  @Post()
  async createUser() {
    await this.producerService.emit()
  }
  @Get()
  findAll() {
    return this.usersService.findAll()
  }
}
