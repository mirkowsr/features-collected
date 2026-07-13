import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: configService.getOrThrow('SERVICE_QUEUE_NAME'),
      queueOptions: {
        durable: false,
      },
    },
  })

  await app.startAllMicroservices()
}

bootstrap()
