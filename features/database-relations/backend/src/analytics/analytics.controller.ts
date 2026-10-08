import { Controller, Get, Query } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/products-in-delivered')
  productsInDelivered() {
    return this.analyticsService.productsInDelivered()
  }

  @Get('/revenue-top')
  revenueTop(@Query('limit') limit: string) {
    return this.analyticsService.revenueTop(limit)
  }
}
