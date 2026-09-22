import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import to from 'await-to-js'
import { customers } from '../db/schema'

@Injectable()
export class CustomersService {
  private logger = new Logger(CustomersService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async getCustomers() {
    this.logger.log('Querying customers')

    const [queryCustomersError, customersData] = await to(
      this.db.select().from(customers),
    )

    if (queryCustomersError) {
      this.logger.log('Error during querying customers')
      throw new InternalServerErrorException()
    }

    return customersData
  }

  async customerCountries() {
    this.logger.log('Querying cutomer countries')

    const [customerCountriesError, customerCountries = []] = await to(
      this.db.select({ country: customers.country }).from(customers),
    )

    if (customerCountriesError) {
      this.logger.log('Error during querying countries for customers')
      throw new InternalServerErrorException()
    }

    return customerCountries
  }
}
