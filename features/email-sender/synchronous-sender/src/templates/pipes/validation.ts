import { BadRequestException, HttpStatus, PipeTransform } from '@nestjs/common'
import { ZodType, z } from 'zod'
import { formatZodErrors } from '../../utils/error-formatter'

export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: T): z.infer<T> {
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
