import * as p from 'drizzle-orm/pg-core'

export const DepartmentTypes = {
  Marketing: 'Marketing',
  Sales: 'Sales',
} as const

export type DepartmentTypes =
  (typeof DepartmentTypes)[keyof typeof DepartmentTypes]

export const departmentEnum = p.pgEnum(
  'department',
  Object.values(DepartmentTypes) as [string, ...string[]],
)
