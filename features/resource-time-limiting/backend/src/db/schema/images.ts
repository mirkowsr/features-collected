import { integer, uuid, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const images = pgTable('images', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  title: varchar({ length: 255 }).notNull(),
  alt_text: varchar({ length: 512 }),
  url: varchar({ length: 1024 }).notNull(),
  width: integer().notNull(),
  height: integer().notNull(),
  file_size: integer(),
  mime_type: varchar({ length: 50 }),
  created_at: timestamp({ withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  updated_at: timestamp({ withTimezone: true, mode: 'date' }),
})
