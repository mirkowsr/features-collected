import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { ZodType, z } from 'zod'
import { formatZodErrors } from '../utils/pipes/error-formatter'

type PipeValue = Partial<Record<string, unknown>>

@Injectable()
export class QueryFilter<T extends ZodType> implements PipeTransform {
  constructor(readonly schema: T) {}

  transform(value: PipeValue): z.infer<T> {
    const result = this.schema.safeParse(value)

    if (!result.success) {
      throw new BadRequestException({
        message: `Validation failed for ${result.error.issues.length} field(s)`,
        code: HttpStatus.BAD_REQUEST,
        errors: formatZodErrors(result.error),
      })
    }

    return result.data
  }
}
