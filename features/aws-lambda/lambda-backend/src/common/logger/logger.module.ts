import { Module } from '@nestjs/common'
import { LoggerModule as PinoLogger } from 'nestjs-pino'

@Module({
  imports: [
    PinoLogger.forRoot({
      pinoHttp: {
        base: undefined,
        messageKey: 'message',
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
        formatters: { level: (label) => ({ level: label }) },
      },
    }),
  ],
  exports: [PinoLogger],
})
export class AppLoggerModule {}
