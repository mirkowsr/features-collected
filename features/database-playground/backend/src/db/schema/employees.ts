import * as p from 'drizzle-orm/pg-core'
import { departmentEnum } from './enums/departments'
import { genderEnum } from './enums/gender'

export const employees = p.pgTable('employees', {
  employeeId: p.uuid('employee_id').primaryKey().notNull().defaultRandom(),
  firstName: p.text('first_name').notNull(),
  lastName: p.text('last_name'),
  department: departmentEnum('department').notNull(),
  gender: genderEnum('gender').notNull(),
  salary: p.integer('salary'),
  birthDate: p.date('birth_date'),
  managerId: p
    .uuid('manager_id')
    .references((): p.AnyPgColumn => employees.employeeId, {
      onDelete: 'set null',
    }),
})
