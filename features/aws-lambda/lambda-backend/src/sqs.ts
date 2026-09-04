import { NestFactory } from '@nestjs/core'
import type { SQSHandler } from 'aws-lambda'
import { ExampleJobModule } from './example-job/example-job.module'
import { ExampleJobService } from './example-job/example-job.service'
import { PinoLogger } from 'nestjs-pino'
import { ConsoleLogger } from '@nestjs/common'

let appPromise: ReturnType<typeof NestFactory.createApplicationContext> | null =
  null

export const handler: SQSHandler = async (event) => {
  appPromise ??= NestFactory.createApplicationContext(ExampleJobModule, {
    logger: new ConsoleLogger({ colors: false }),
  })
  const app = await appPromise

  const jobs = app.get(ExampleJobService)
  const logger = await app.resolve(PinoLogger)

  const failures: string[] = []

  for (const record of event.Records) {
    try {
      await jobs.process(record.body)
    } catch (error) {
      logger.error(
        { messageId: record.messageId, err: error },
        'message processing failed.',
      )
      failures.push(record.messageId)
    }
  }

  return { batchItemFailures: failures.map((id) => ({ itemIdentifier: id })) }
}
