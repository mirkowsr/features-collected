import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AllowedQueries } from '../types'

@Injectable()
export class RequestQueryInterceptor<T> implements NestInterceptor {
  private VALID_QUERY_KEYS: AllowedQueries<T> = new Set()

  constructor(validKeys: AllowedQueries<T>) {
    this.VALID_QUERY_KEYS = validKeys
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const url = new URL(request.url, `http://${request.headers.host}`)

    for (const key of url.searchParams.keys()) {
      if (!this.VALID_QUERY_KEYS.has(key as T)) {
        url.searchParams.delete(key)
      }
    }

    request.url = url.pathname + url.search

    return next.handle()
  }
}
