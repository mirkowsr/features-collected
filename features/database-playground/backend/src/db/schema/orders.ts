import * as p from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { employees } from './employees'
import { products } from './products'
import { orderStatusEnum } from './enums/orders'

export const orders = p.pgTable('orders', {
  orderId: p.uuid('order_id').primaryKey().defaultRandom(),
  customerId: p
    .uuid('customer_id')
    .references(() => customers.customerId)
    .notNull(),
  salespersonId: p
    .uuid('salesperson_id')
    .references(() => employees.employeeId, { onDelete: 'set null' }),
  productId: p
    .uuid('product_id')
    .references(() => products.productId)
    .notNull(),
  orderDate: p.date('order_date'),
  shipDate: p.date('ship_date'),
  orderStatus: orderStatusEnum('order_status'),
  shipAddress: p.text('ship_address'),
  billAddress: p.text('bill_address'),
  quantity: p.integer('quantity'),
  sales: p.integer('sales'),
  creationTime: p.timestamp('creation_time'),
})
