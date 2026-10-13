import * as p from 'drizzle-orm/pg-core'

export const customers = p.pgTable('customers', {
  customerId: p.uuid('customer_id').notNull().primaryKey().defaultRandom(),
  firstName: p.text('first_name'),
  lastName: p.text('last_name'),
  country: p.text('country'),
  score: p.integer('score'),
})
