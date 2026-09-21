import * as p from 'drizzle-orm/pg-core'

export const customers = p.pgTable('customers', {
  id: p.uuid('customer_id').notNull().primaryKey().defaultRandom(),
})
