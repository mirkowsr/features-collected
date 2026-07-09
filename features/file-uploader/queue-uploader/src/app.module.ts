import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ClientsModule, Transport } from '@nestjs/microservices'
import { UploadQueueModule } from './upload-queue/upload-queue.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'RABBIT_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'upload_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    UploadQueueModule,
  ],
  controllers: [],
})
export class AppModule {}
