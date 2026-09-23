import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import to from 'await-to-js'
import { customers } from '../db/schema'
import { desc, isNotNull, eq, SQL, and } from 'drizzle-orm'
import { CustomersFilterParams } from './filtering/types'

@Injectable()
export class CustomersService {
  private logger = new Logger(CustomersService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  private buildQueryConditions(params: CustomersFilterParams): SQL | undefined {
    const conditions: SQL[] = []

    for (const key of Object.keys(params) as (keyof CustomersFilterParams)[]) {
      const value = params[key]

      if (value) {
        conditions.push(eq(customers[key], value))
      }
    }

    return conditions.length ? and(...conditions) : undefined
  }

  async getCustomers(params: CustomersFilterParams) {
    this.logger.log('Querying customers')

    const conditions = this.buildQueryConditions(params)

    const [queryCustomersError, customersData] = await to(
      this.db.select().from(customers).where(conditions),
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
      this.db.selectDistinct({ country: customers.country }).from(customers),
    )

    if (customerCountriesError) {
      this.logger.log('Error during querying countries for customers')
      throw new InternalServerErrorException()
    }

    return customerCountries
  }

  async customerScores() {
    this.logger.log('Querying customer scores')

    const [customerScoresError, customersWithScores = []] = await to(
      this.db
        .select({
          customerId: customers.customerId,
          score: customers.score,
          firstName: customers.firstName,
          lastName: customers.lastName,
        })
        .from(customers)
        .where(isNotNull(customers.score))
        .orderBy(desc(customers.score)),
    )

    if (customerScoresError) {
      this.logger.error('Error during querying customers with scores')

      throw new InternalServerErrorException()
    }

    return customersWithScores
  }
}
