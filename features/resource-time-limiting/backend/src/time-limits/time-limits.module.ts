import { Module } from '@nestjs/common'
import { TimeLimitsService } from './time-limits.service'
import { TimeLimitsController } from './time-limits.controller'

@Module({
  controllers: [TimeLimitsController],
  providers: [TimeLimitsService],
})
export class TimeLimitsModule {}
