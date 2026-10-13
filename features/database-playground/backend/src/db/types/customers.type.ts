import { InferSelectModel } from 'drizzle-orm'
import { customers } from '../schema'

export type Customers = InferSelectModel<typeof customers>
