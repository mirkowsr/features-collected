import { Global, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

const rabbitClientModule = ClientsModule.registerAsync([
  {
    name: 'FACADE_CLIENT_QUEUE',
    useFactory: () => ({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'facade_queue',
        queueOptions: { durable: false },
      },
    }),
  },
])

@Global()
@Module({
  imports: [rabbitClientModule],
  exports: [rabbitClientModule],
})
export class RabbitMqModule {}
