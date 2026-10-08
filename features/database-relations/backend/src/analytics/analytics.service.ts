import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { orders, products } from '../db/schema'
import to from 'await-to-js'
import { eq, getTableColumns, inArray } from 'drizzle-orm'
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
}
