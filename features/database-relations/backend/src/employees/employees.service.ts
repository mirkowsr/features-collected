import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { employees } from '../db/schema'
import { eq } from 'drizzle-orm'
import to from 'await-to-js'
import { alias } from 'drizzle-orm/pg-core'

@Injectable()
export class EmployeesService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  private logger = new Logger(EmployeesService.name)

  async employeesHierarchy() {
    const manager = alias(employees, 'manager')

    const [employeesHierarchyError, employeesHierarchyData] = await to(
      this.db
        .select({
          employeeId: employees.employeeId,
          firstName: employees.firstName,
          lastName: employees.lastName,
          manager: {
            managerId: manager.employeeId,
            firstName: manager.firstName,
            lastName: manager.lastName,
          },
        })
        .from(employees)
        .leftJoin(manager, eq(employees.managerId, manager.employeeId)),
    )

    if (employeesHierarchyError) {
      this.logger.error('Error during employees hierarchy query')

      throw new InternalServerErrorException(
        'Error during employees hierarchy query',
      )
    }

    return employeesHierarchyData
  }
}
