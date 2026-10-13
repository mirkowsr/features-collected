import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { products } from '../../db/schema'

const ProducsSchema = createInsertSchema(products, {
  product: z.string().min(1),
  category: z.string().min(1),
  price: z.string().min(1),
})
export const BulkInsertsProductsSchema = z.array(ProducsSchema).min(1)

export type Products = z.infer<typeof ProducsSchema>
