import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RetryService {
  private attempts = 0
  private delayTime = 1000
  constructor(private config: ConfigService) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    const retries = this.config.get('UPLOAD_RETRIES', 5)

    while (this.attempts < retries) {
      this.increment()

      try {
        return await fn()
      } catch (e) {
        if (this.attempts >= retries) {
          throw new InternalServerErrorException(
            `Upload failed after ${this.attempts} UPLOAD_RETRIES`,
          )
        }
        await this.delay()
      }
    }
    throw new Error('Unreachable')
  }
  private delay() {
    return new Promise((r) => setTimeout(r, this.delayTime))
  }

  get attemptsCount() {
    return this.attempts
  }

  reset() {
    this.attempts = 0
  }

  increment() {
    this.attempts++
  }
}
