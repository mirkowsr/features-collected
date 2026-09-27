import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import to from 'await-to-js'
import { eq } from 'drizzle-orm'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { customers, employees, orders, products } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'

@Injectable()
export class OrdersService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  private logger = new Logger(OrdersService.name)
  private CommonQueriedColumns = {
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
  }

  async orders() {
    const [ordersError, ordersData] = await to(
      this.db
        .select(this.CommonQueriedColumns)
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

  async orderDetails(id: string) {
    const [orderDetailsError, orderDetails] = await to(
      this.db
        .select(this.CommonQueriedColumns)
        .from(orders)
        .innerJoin(customers, eq(customers.customerId, orders.customerId))
        .innerJoin(products, eq(products.productId, orders.productId))
        .leftJoin(employees, eq(employees.employeeId, orders.salespersonId))
        .where(eq(orders.orderId, id))
        .then((orders) => orders[0]),
    )

    if (orderDetailsError) {
      this.logger.error('Error while querying order details')

      throw new InternalServerErrorException(
        'Error during querying order details',
      )
    }

    if (!orderDetails) {
      throw new NotFoundException(`Order with given id:${id} not found`)
    }

    return orderDetails
  }
}
