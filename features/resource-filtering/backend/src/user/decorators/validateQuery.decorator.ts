import { UseInterceptors } from '@nestjs/common'
import { RequestQueryInterceptor } from '../interceptors/query.interceptor'

export function ValidateQueryParams<T>(...keys: T[]) {
  return UseInterceptors(new RequestQueryInterceptor(new Set(keys)))
}
