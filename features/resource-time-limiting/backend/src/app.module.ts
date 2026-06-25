import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DrizzleModule } from './db/drizzle.module'
import { ImagesModule } from './images/images.module'
import { TimeLimitsModule } from './time-limits/time-limits.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    ImagesModule,
    TimeLimitsModule,
  ],
  controllers: [],
})
export class AppModule {}
