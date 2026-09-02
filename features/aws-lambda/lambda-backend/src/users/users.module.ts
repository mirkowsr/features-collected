import { Module } from '@nestjs/common'
import { ProducerModule } from '../common/producer/producer.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [ProducerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
