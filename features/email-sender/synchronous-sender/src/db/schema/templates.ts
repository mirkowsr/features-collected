import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export enum TemplateStatus {
  Uploading = 'pending',
  Ready = 'uploaded',
  Failed = 'failed',
}

export const statusEnum = pgEnum(
  'template_upload_status',
  Object.values(TemplateStatus) as [string, ...string[]],
)
export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  storageKey: uuid('storage_key').unique().notNull(),
  name: text('template_name').notNull(),
  createdAt: timestamp('sent_at').defaultNow(),
  templateUploadStatus: statusEnum().default('pending').notNull(),
})
