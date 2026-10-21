import {
  BadRequestException,
  HttpStatus,
  type PipeTransform,
} from '@nestjs/common'
import type { ZodError, ZodType, z } from 'zod'

import { formatZodErrors } from '../utils/error-formatter'

export type ZodErrorFormatter = (error: ZodError, key?: string) => unknown

export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(
    private schema: T,
    private formatter: ZodErrorFormatter = formatZodErrors,
  ) {}

  transform(value: T): z.infer<T> {
    const result = this.schema.safeParse(value)

    if (!result.success) {
      throw new BadRequestException({
        message: `Validation failed for ${result.error.issues.length} field(s)`,
        code: HttpStatus.BAD_REQUEST,
        errors: this.formatter(result.error),
      })
    }

    return result.data
  }
}
