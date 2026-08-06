import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { templates } from './templates'
import { users } from './users'

export enum EmailStatus {
  Pending = 'pending',
  Sent = 'sent',
  Failed = 'failed',
}

export const statusEnum = pgEnum(
  'email_status',
  Object.values(EmailStatus) as [string, ...string[]],
)

export const emails = pgTable('emails', {
  id: serial('id').primaryKey(),
  to: text('to').notNull(),
  status: statusEnum().default('pending').notNull(),
  sentAt: timestamp('sent_at').defaultNow(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  templateId: integer('template_id')
    .notNull()
    .references(() => templates.id),
})
