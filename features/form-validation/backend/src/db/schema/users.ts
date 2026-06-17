import { integer, uuid, pgTable, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  age: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
})
