import * as p from 'drizzle-orm/pg-core'

export const products = p.pgTable('products', {
  productId: p.uuid('product_id').notNull().primaryKey().defaultRandom(),
})
