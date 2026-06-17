import { PipeTransform } from '@nestjs/common'
import { ZodType } from 'zod'
import { formatZodErrors } from '../../utils/error-formatter'

type Response = {
  field: string
  isValid: boolean
  message: string[]
  code: ERROR_CODES
}

enum ERROR_CODES {
  notFound = 'notFound',
  valid = 'valid',
  invalid = 'invalid',
}

export class DynamicValidation implements PipeTransform {
  constructor(private schema: Map<string, ZodType>) {}

  transform(body: Record<string, unknown>) {
    let response: Response[] = []

    if (!body) {
      return [
        {
          field: 'invalid field',
          isValid: false,
          message: ['Specify key value pair to validate'],
          code: ERROR_CODES.notFound,
        },
      ]
    }

    for (const key of Object.keys(body)) {
      const value = body[key]
      const schema = this.schema.get(key)

      const result = schema?.safeParse(value)

      if (!result) {
        response = [
          ...response,
          {
            field: key,
            isValid: false,
            message: [`cannot validate ${key}`],
            code: ERROR_CODES.notFound,
          },
        ]
      }
      if (!result?.success && result?.error) {
        const flattenedErrors = formatZodErrors(result.error, key)

        response = [
          ...response,
          ...flattenedErrors.map((e) => ({ ...e, code: ERROR_CODES.invalid })),
        ]
      }

      if (result?.success) {
        response = [
          ...response,
          { field: key, isValid: true, message: [], code: ERROR_CODES.valid },
        ]
      }
    }

    return response
  }
}
