import { Module } from '@nestjs/common'
import { ExampleJobService } from './example-job.service'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from '../db/drizzle.module'
import { AppLoggerModule } from '../common/logger/logger.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AppLoggerModule,
  ],
  providers: [ExampleJobService],
})
export class ExampleJobModule {}
