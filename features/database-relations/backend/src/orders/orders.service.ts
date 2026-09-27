import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import to from 'await-to-js'
import { customers, employees, orders, products } from '../db/schema'
import { eq } from 'drizzle-orm'

@Injectable()
export class OrdersService {
  private logger = new Logger(OrdersService.name)

  constructor(@InjectDrizzle() private db: DrizzleSchema) {}
  async orders() {
    const [ordersError, ordersData] = await to(
      this.db
        .select({
          orderId: orders.orderId,
          customerDetails: {
            customerId: customers.customerId,
            customerLastName: customers.lastName,
            customerFirstName: customers.firstName,
          },
          orderDetails: {
            orderDate: orders.orderDate,
            orderShipDate: orders.shipDate,
            orderStatus: orders.orderStatus,
          },
          salesPersonDetails: {
            salesPersonFirstName: employees.firstName,
            salesPersonLastName: employees.lastName,
            salesPersonId: employees.employeeId,
          },
          productDetails: {
            productId: products.productId,
            productName: products.product,
            productPrice: products.price,
            productCategory: products.category,
          },
        })
        .from(orders)
        .innerJoin(customers, eq(customers.customerId, orders.customerId))
        .innerJoin(products, eq(products.productId, orders.productId))
        .leftJoin(employees, eq(employees.employeeId, orders.salespersonId)),
    )

    if (ordersError) {
      this.logger.error('Error during querying orders')
      throw new InternalServerErrorException('Error during querying orders')
    }

    return ordersData
  }
}
