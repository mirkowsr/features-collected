import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ClientsModule, Transport } from '@nestjs/microservices'
import { DrizzleModule } from './db/drizzle.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { AwsS3Module } from './aws-s3'

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
          queue: 'upload_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    FileUploadModule,
    AwsS3Module,
  ],
  controllers: [],
})
export class AppModule {}
