import { BadRequestException, type PipeTransform } from '@nestjs/common'
import type { ZodType } from 'zod'

import { formatZodErrors } from '../utils/error-formatter'

export enum DynamicValidationErrorCode {
  notFound = 'notFound',
  valid = 'valid',
  invalid = 'invalid',
}

export type DynamicValidationResponse = {
  field: string
  isValid: boolean
  message: string[]
  code: DynamicValidationErrorCode
}

export class DynamicValidation implements PipeTransform {
  constructor(private schema: Map<string, ZodType>) {}

  transform(
    body: Record<string, unknown> | null | undefined,
  ): DynamicValidationResponse[] {
    let response: DynamicValidationResponse[] = []

    if (!body) {
      return [
        {
          field: 'invalid field',
          isValid: false,
          message: ['Specify key value pair to validate'],
          code: DynamicValidationErrorCode.notFound,
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
            code: DynamicValidationErrorCode.notFound,
          },
        ]
      }

      if (!result?.success && result?.error) {
        const flattenedErrors = formatZodErrors(result.error, key)

        response = [
          ...response,
          ...flattenedErrors.map((error) => ({
            ...error,
            code: DynamicValidationErrorCode.invalid,
          })),
        ]
      }

      if (result?.success) {
        response = [
          ...response,
          {
            field: key,
            isValid: true,
            message: [],
            code: DynamicValidationErrorCode.valid,
          },
        ]
      }
    }

    const hasInvalidResults = response.some((result) => !result.isValid)

    if (hasInvalidResults) {
      throw new BadRequestException({
        message: 'validation failed',
        isValid: false,
        results: response,
      })
    }
    return response
  }
}
