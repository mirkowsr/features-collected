import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { eq, and } from 'drizzle-orm'
import { InjectDrizzle } from '../../db/drizzle.decorator'
import { time_limits } from '../../db/schema'
import { DrizzleSchema } from '../../db/types/drizzle.type'
import { TimeLimitsUtils } from '../../utils/time-limits.utils'
import { Reflector } from '@nestjs/core'
import { TimeLimitedResource } from '../../time-limits/decorators/time-limit.decorator'

@Injectable()
export class TimeLimitsGuard implements CanActivate {
  constructor(
    @InjectDrizzle() private db: DrizzleSchema,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const resource = this.reflector.get(
      TimeLimitedResource,
      context.getHandler(),
    )

    const id = request.params?.id

    const [result] = await this.db
      .select()
      .from(time_limits)
      .where(
        and(
          eq(time_limits.resource_type, resource),
          eq(time_limits.resource_id, id),
        ),
      )

    if (!result) {
      throw new NotFoundException({
        message: 'Resource not found',
        code: HttpStatus.NOT_FOUND,
      })
    }

    const hasExpired = TimeLimitsUtils.hasExpired(result.valid_till)

    if (hasExpired) {
      throw new ForbiddenException({
        message: 'Resource is not available',
        code: HttpStatus.FORBIDDEN,
      })
    }

    return true
  }
}
