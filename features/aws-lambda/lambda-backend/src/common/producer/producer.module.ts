import { Module } from '@nestjs/common'
import { AppLoggerModule } from '@repo/backend-logging'

import { ProducerService } from './producer.service'

@Module({
  imports: [AppLoggerModule],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
