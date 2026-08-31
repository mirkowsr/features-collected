import { Module } from '@nestjs/common'
import { ExampleJobService } from './example-job.service'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from '../db/drizzle.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        base: undefined,
        messageKey: 'message',
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
        formatters: { level: (label) => ({ level: label }) },
      },
    }),
    DrizzleModule,
  ],
  providers: [ExampleJobService],
})
export class ExampleJobModule {}
