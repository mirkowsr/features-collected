import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().unique(),
  name: text('name').notNull(),
})
