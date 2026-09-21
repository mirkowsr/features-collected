import * as p from 'drizzle-orm/pg-core'

export const employees = p.pgTable('employees', {
  employeeId: p.uuid('employee_id').primaryKey().notNull().defaultRandom(),
  managerId: p
    .uuid('manager_id')
    .references((): p.AnyPgColumn => employees.employeeId, {
      onDelete: 'set null',
    }),
})
