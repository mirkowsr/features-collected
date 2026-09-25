import { Controller, Get, Query } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersFilterParams } from './filtering/types'

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  customers(@Query() params: CustomersFilterParams) {
    return this.customersService.getCustomers(params)
  }

  @Get('/countries')
  customerCountries() {
    return this.customersService.customerCountries()
  }

  @Get('/top')
  customerScores() {
    return this.customersService.customerScores()
  }

  @Get('/score-bands')
  customerScoreBands() {
    return this.customersService.scoreBands()
  }
}
