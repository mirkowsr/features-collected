import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const UploadStatus = {
  pending: 'pending',
  finished: 'finished',
  error: 'error',
} as const

export type UploadStatusTypes = (typeof UploadStatus)[keyof typeof UploadStatus]

export const uploadEnum = pgEnum(
  'upload_status',
  Object.values(UploadStatus) as [string, ...string[]],
)

export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  mime_type: varchar({ length: 255 }).notNull(),
  file_size: integer().notNull(),
  upload_status: uploadEnum().notNull(),
  upload_date: timestamp({ withTimezone: true, mode: 'date' }),
  original_name: varchar().notNull(),
})
