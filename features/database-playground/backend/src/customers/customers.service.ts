import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { FilterBuilder, type PaginatedResponse } from '@repo/backend-filtering'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import type { Customers } from '../db/types/customers.type'
import to from 'await-to-js'
import { customers, orders } from '../db/schema'
import {
  desc,
  isNotNull,
  eq,
  sql,
  asc,
  getTableColumns,
  count,
  isNull,
} from 'drizzle-orm'
import type { CustomersFilterParams } from './filtering/types'

@Injectable()
export class CustomersService {
  private logger = new Logger(CustomersService.name)

  private filterBuilder = new FilterBuilder(customers, [
    customers.lastName,
    customers.firstName,
    customers.country,
  ])

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async getCustomers({
    q,
    page,
    pageSize,
    ...restQueryParams
  }: CustomersFilterParams): Promise<PaginatedResponse<Customers>> {
    this.logger.log('Querying customers')
    const { conditions, pageNumber, pageSizeNumber, offset } =
      this.filterBuilder.build({ q, page, pageSize, ...restQueryParams })

    const [totalCountError, totalCount] = await to(
      this.db
        .select({ count: count() })
        .from(customers)
        .where(conditions)
        .then((countData) => countData[0]?.count),
    )

    if (totalCountError) {
      this.logger.error('Error during total count querying')

      throw new InternalServerErrorException()
    }

    const [queryCustomersError, customersData] = await to(
      this.db
        .select({
          ...getTableColumns(customers),
        })
        .from(customers)
        .where(conditions)
        .orderBy(asc(customers.customerId))
        .limit(pageSizeNumber)
        .offset(offset),
    )

    if (queryCustomersError) {
      this.logger.log('Error during querying customers')

      throw new InternalServerErrorException()
    }

    return {
      data: customersData,
      meta: {
        page: pageNumber,
        pageSize: pageSizeNumber,
        total: Number(totalCount),
        totalPages: Math.max(1, Math.ceil(Number(totalCount) / pageSizeNumber)),
      },
    }
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

  async scoreBands() {
    this.logger.log('Querying customers with score bands')

    const [customerScoreBandsErrror, customerWithScoreBands = []] = await to(
      this.db
        .select({
          customerId: customers.customerId,
          firstName: customers.firstName,
          lastName: customers.lastName,
          band: sql`
            case
              when ${customers.score} is null then 'Unknown'
              when ${customers.score} >= 800  then 'High'
              when ${customers.score} >= 400  then 'Medium'
              else 'Low'
            end`,
        })
        .from(customers),
    )

    if (customerScoreBandsErrror) {
      this.logger.error('Error during queriying customers with bands')

      throw new InternalServerErrorException()
    }

    return customerWithScoreBands
  }

  async customersNoOrders() {
    const [customersNoOrdersError, customersNoOrdersData] = await to(
      this.db
        .select({
          firstName: customers.firstName,
          lastName: customers.lastName,
          country: customers.country,
          customerId: customers.customerId,
        })
        .from(customers)
        .leftJoin(orders, eq(customers.customerId, orders.customerId))
        .where(isNull(orders.customerId)),
    )

    if (customersNoOrdersError) {
      this.logger.error('Error during queriying customers without orders')

      throw new InternalServerErrorException()
    }

    return customersNoOrdersData
  }
}
