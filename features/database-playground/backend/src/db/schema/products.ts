import * as p from 'drizzle-orm/pg-core'

export const products = p.pgTable('products', {
  productId: p.uuid('product_id').notNull().primaryKey().defaultRandom(),
  product: p.text('product'),
  category: p.text('category'),
  price: p.numeric('price', { precision: 10, scale: 2 }),
})
