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

export const templateUploadStatus = pgEnum(
  'template_upload_status',
  Object.values(TemplateStatus) as [string, ...string[]],
)
export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  storageKey: uuid('storage_key').unique().notNull(),
  name: text('template_name').notNull(),
  createdAt: timestamp('sent_at').defaultNow(),
  templateUploadStatus: templateUploadStatus('template_upload_status')
    .default('pending')
    .notNull(),
})
