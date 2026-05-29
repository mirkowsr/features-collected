import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

type QueryParams<T extends string> = Partial<Record<T, unknown>>

@Injectable()
export class QueryPipe<T extends string> implements PipeTransform<
  QueryParams<T>,
  QueryParams<T>
> {
  private ALLOWED_PARAMS: T[] = []

  constructor(allowedParams: T[]) {
    this.ALLOWED_PARAMS = allowedParams
  }

  transform(params: QueryParams<T>): QueryParams<T> {
    const requestParams = Object.keys(params)

    const allAllowed = requestParams.every((p) =>
      this.ALLOWED_PARAMS.includes(p as T),
    )

    if (!allAllowed) {
      throw new BadRequestException('Invalid params')
    }

    return params
  }
}
