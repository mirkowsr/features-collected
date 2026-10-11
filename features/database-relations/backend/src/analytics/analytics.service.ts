import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import to from 'await-to-js'
import { asc, desc, eq, getTableColumns, inArray, sql, sum } from 'drizzle-orm'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { customers, orders, products } from '../db/schema'
import { OrderStatusEnum } from '../db/schema/enums/orders'
import { DrizzleSchema } from '../db/types/drizzle.type'

@Injectable()
export class AnalyticsService {
  private logger = new Logger(AnalyticsService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  async productsInDelivered() {
    const { productId, product } = getTableColumns(products)

    const productsInDeliveredStatus = this.db
      .select({ productId: orders.productId })
      .from(orders)
      .where(eq(orders.orderStatus, OrderStatusEnum.Delivered))

    const [productsInDeliveredError, productsInDeliveredData] = await to(
      this.db
        .select({ productId, product })
        .from(products)
        .where(inArray(productId, productsInDeliveredStatus)),
    )

    if (productsInDeliveredError) {
      this.logger.error('error while querying products in delivered')

      throw new InternalServerErrorException(
        'error while querying products in delivered',
      )
    }

    return productsInDeliveredData
  }

  async revenueTop(limit: string) {
    let numberLimit = Number(limit) ?? undefined

    const revenueCte = this.db.$with('revenueCte').as(
      this.db
        .select({
          saleRevenue: sum(orders.sales).as('saleRevenue'),
          customerId: orders.customerId,
        })
        .from(orders)
        .groupBy(orders.customerId),
    )

    const [revenueTopError, revenueTopData] = await to(
      this.db
        .with(revenueCte)
        .select({
          revenue: revenueCte.saleRevenue,
          customerId: revenueCte.customerId,
          firstName: customers.firstName,
          lastName: customers.lastName,
        })
        .from(revenueCte)
        .leftJoin(customers, eq(customers.customerId, revenueCte.customerId))
        .orderBy(desc(revenueCte.saleRevenue))
        .limit(numberLimit),
    )

    if (revenueTopError) {
      throw new InternalServerErrorException('revenue top querying error')
    }

    return revenueTopData
  }

  async customersRank() {
    const [customersRankError, customersRank] = await to(
      this.db
        .select({
          customerId: customers.customerId,
          firstName: customers.firstName,
          lastName: customers.lastName,
          score: customers.score,
          rank: sql<number>`dense_rank() over (order by ${customers.score})::int`.as(
            'customerRank',
          ),
        })
        .from(orders)
        .leftJoin(customers, eq(customers.customerId, orders.customerId))
        .orderBy(({ rank }) => asc(rank)),
    )

    if (customersRankError) {
      throw new InternalServerErrorException(
        'Error while querying customer ranks',
      )
    }

    return customersRank
  }

  async runningTotal() {
    const [runningAverageError, runningAverageData] = await to(
      this.db
        .select({
          orderId: orders.orderId,
          orderAmount:
            sql<number>`${orders.quantity} * ${products.price}::int`.as(
              'orderAmount',
            ),
          runningTotal: sql<number>`sum(${orders.quantity}*${products.price}) 
          over(order by ${orders.orderDate})`.as('runningTotal'),
        })
        .from(orders)
        .leftJoin(products, eq(products.productId, orders.productId))
        .orderBy(asc(orders.orderDate)),
    )

    if (runningAverageError) {
      throw new InternalServerErrorException(
        'Error while querying running average data',
      )
    }

    return runningAverageData
  }
}
