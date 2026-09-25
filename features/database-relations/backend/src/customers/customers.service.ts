import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import to from 'await-to-js'
import { customers } from '../db/schema'
import {
  desc,
  isNotNull,
  eq,
  SQL,
  and,
  or,
  ilike,
  sql,
  asc,
  getTableColumns,
  count,
} from 'drizzle-orm'
import {
  CustomerFilterKeys,
  CustomerFuzzySearchParam,
  CustomerQuerySearchParams,
  CustomersFilterParams,
} from './filtering/types'

@Injectable()
export class CustomersService {
  private logger = new Logger(CustomersService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  private parsePositiveInt(
    value: string | undefined,
    fallback: number,
  ): number {
    if (value === undefined || value === '') return fallback

    const n = Number(value)
    return Number.isFinite(n) ? Math.max(1, Math.floor(n)) : fallback
  }

  private buildQueryParamBasedFilters(
    params: CustomerQuerySearchParams,
  ): SQL | undefined {
    const conditions: SQL[] = []

    for (const key of Object.keys(params) as CustomerFilterKeys[]) {
      const value = params[key]

      if (value) {
        conditions.push(eq(customers[key], value))
      }
    }

    return conditions.length ? and(...conditions) : undefined
  }

  private buildFuzzySearchFilters({
    q,
  }: CustomerFuzzySearchParam): SQL | undefined {
    const conditions: SQL[] = []

    const filtered_columns: CustomerFilterKeys[] = [
      'lastName',
      'firstName',
      'country',
    ]

    for (const key of filtered_columns) {
      conditions.push(ilike(customers[key], `%${q}%`))
    }

    return conditions.length ? or(...conditions) : undefined
  }

  async getCustomers({
    q,
    page,
    pageSize,
    ...restQueryParams
  }: CustomersFilterParams) {
    this.logger.log('Querying customers')
    let conditions = undefined

    const pageNumber = this.parsePositiveInt(page, 1)
    const pageSizeNumber = this.parsePositiveInt(pageSize, 20)

    if (q) {
      conditions = this.buildFuzzySearchFilters({ q })
    } else {
      conditions = this.buildQueryParamBasedFilters(restQueryParams)
    }

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
        .offset((pageNumber - 1) * pageSizeNumber),
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
}
