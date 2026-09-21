import * as p from 'drizzle-orm/pg-core'
import { customers } from './customers'
import { employees } from './employees'
import { products } from './products'

export const orders = p.pgTable('orders', {
  orderId: p.uuid('order_id').primaryKey().defaultRandom(),
  customerId: p
    .uuid('customer_id')
    .references(() => customers.id)
    .notNull(),
  salesPersonId: p
    .uuid('salesperson_id')
    .references(() => employees.employeeId, { onDelete: 'set null' }),
  productId: p
    .uuid('product_id')
    .references(() => products.productId)
    .notNull(),
})
