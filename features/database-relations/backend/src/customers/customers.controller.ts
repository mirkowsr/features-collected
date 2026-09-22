import { Controller, Get } from '@nestjs/common'
import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  customers() {
    return this.customersService.getCustomers()
  }

  @Get('/customers/countries')
  customerCountries() {
    return this.customersService.customerCountries()
  }
}
