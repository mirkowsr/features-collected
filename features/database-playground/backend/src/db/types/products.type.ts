import { InferSelectModel } from 'drizzle-orm'
import { products } from '../schema'

export type Products = InferSelectModel<typeof products>
