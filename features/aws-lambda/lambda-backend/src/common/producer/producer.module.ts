import { Module } from '@nestjs/common'
import { AppLoggerModule } from '../logger/logger.module'
import { ProducerService } from './producer.service'

@Module({
  imports: [AppLoggerModule],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
