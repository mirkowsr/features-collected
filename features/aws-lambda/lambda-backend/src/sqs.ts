import { NestFactory } from '@nestjs/core'
import type { SQSHandler } from 'aws-lambda'
import { ExampleJobModule } from './example-job/example-job.module'
import { ExampleJobService } from './example-job/example-job.service'

let appPromise: ReturnType<typeof NestFactory.createApplicationContext> | null =
  null

export const handler: SQSHandler = async (event) => {
  appPromise ??= NestFactory.createApplicationContext(ExampleJobModule)

  const jobs = (await appPromise).get(ExampleJobService)

  const failures: string[] = []

  for (const record of event.Records) {
    try {
      await jobs.process(record.body)
    } catch {
      failures.push(record.messageId)
    }
  }

  return { batchItemFailures: failures.map((id) => ({ itemIdentifier: id })) }
}
