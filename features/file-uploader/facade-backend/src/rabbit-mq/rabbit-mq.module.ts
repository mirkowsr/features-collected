import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

const rabbitClientModule = ClientsModule.registerAsync([
  {
    name: 'FILE_PROCESS',
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [config.getOrThrow('QUEUE_ADRESS')] as string[],
        queue: config.getOrThrow('FILE_PROCESS_QUEUE_NAME'),
        queueOptions: {
          durable: false,
        },
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
