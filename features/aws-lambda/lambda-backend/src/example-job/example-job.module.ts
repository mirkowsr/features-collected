import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppLoggerModule } from '@repo/backend-logging'

import { DrizzleModule } from '../db/drizzle.module'
import { ExampleJobService } from './example-job.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AppLoggerModule,
  ],
  providers: [ExampleJobService],
})
export class ExampleJobModule {}
