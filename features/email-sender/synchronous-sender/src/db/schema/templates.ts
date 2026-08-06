import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  name: text('template_name').notNull(),
  createdAt: timestamp('sent_at').defaultNow(),
})
