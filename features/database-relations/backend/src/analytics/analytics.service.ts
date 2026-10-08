import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { customers, orders, products } from '../db/schema'
import to from 'await-to-js'
import { desc, eq, getTableColumns, inArray, sum } from 'drizzle-orm'
import { OrderStatusEnum } from '../db/schema/enums/orders'

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
    console.log('@@@', limit)

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
}
