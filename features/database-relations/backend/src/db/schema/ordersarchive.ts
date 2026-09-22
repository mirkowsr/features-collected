import * as p from 'drizzle-orm/pg-core'
import { orderStatusEnum } from './enums/orders'

export const ordersarchive = p.pgTable('ordersarchive', {
  orderId: p.uuid('order_id'),
  orderDate: p.date('order_date'),
  shipDate: p.date('ship_date'),
  orderStatus: orderStatusEnum('order_status'),
  shipAddress: p.text('ship_address'),
  billAddress: p.text('bill_address'),
  quantity: p.integer('quantity'),
  sales: p.integer('sales'),
  creationTime: p.timestamp('creation_time'),
  productId: p.uuid('product_id'),
  customerId: p.uuid('customer_id'),
  salespersonId: p.uuid('salesperson_id'),
})
