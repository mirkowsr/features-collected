import * as p from 'drizzle-orm/pg-core'

export const GenderEnum = {
  Male: 'M',
  Female: 'F',
} as const

export type GenderType = (typeof GenderEnum)[keyof typeof GenderEnum]

export const genderEnum = p.pgEnum(
  'gender',
  Object.values(GenderEnum) as [string, ...string[]],
)
