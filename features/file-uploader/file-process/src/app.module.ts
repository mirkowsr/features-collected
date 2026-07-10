import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module'
import { FileProcessModule } from './file-process/file-process.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMqModule,
    FileProcessModule,
  ],
  controllers: [],
})
export class AppModule {}
