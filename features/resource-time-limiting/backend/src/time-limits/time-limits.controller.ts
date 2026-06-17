import { Get, Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../common/pipes/ZodValidationPipe'
import { TimeLimitsService } from './time-limits.service'
import { TimeLimitDto, TimeLimitSchema } from './validation/time-limits'

@Controller('time-limits')
export class TimeLimitsController {
  constructor(private readonly timeLimitsService: TimeLimitsService) {}

  @Get()
  findAll() {
    return this.timeLimitsService.findMany()
  }

  @Post()
  @UsePipes(new ZodValidationPipe(TimeLimitSchema))
  create(@Body() createTimeLimitDto: TimeLimitDto) {
    return this.timeLimitsService.create(createTimeLimitDto)
  }
}
