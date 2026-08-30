import { Module } from '@nestjs/common'
import { ExampleJobService } from './example-job.service'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from '../db/drizzle.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DrizzleModule],
  providers: [ExampleJobService],
})
export class ExampleJobModule {}
