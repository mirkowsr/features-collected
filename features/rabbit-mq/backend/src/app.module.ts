import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { DrizzleModule } from './db/drizzle.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SimpleQueueModule } from './simple-queue/simple-queue.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    ClientsModule.register([
      {
        name: 'RABBIT_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    SimpleQueueModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
