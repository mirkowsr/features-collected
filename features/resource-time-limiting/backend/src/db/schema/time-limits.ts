import { pgEnum, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

export const ResourceTypes = ['image'] as const

export type ResourceType = (typeof ResourceTypes)[number]

export const resourcesEnum = pgEnum('resource_type', ResourceTypes)

export const time_limits = pgTable(
  'time_limits',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    resource_type: resourcesEnum().notNull(),
    resource_id: uuid('resource_id').notNull(),
    valid_till: timestamp({ withTimezone: true, mode: 'date' }).notNull(),
  },
  (table) => [unique().on(table.resource_type, table.resource_id)],
)
