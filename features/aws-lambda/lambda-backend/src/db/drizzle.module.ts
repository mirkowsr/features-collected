import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema'

export const DrizzleDB = Symbol('drizzle-connection')

@Global()
@Module({
  providers: [
    {
      provide: DrizzleDB,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const pool = new Pool({
          host: config.getOrThrow<string>('DB_HOST'),
          port: config.getOrThrow<number>('DB_PORT'),
          user: config.getOrThrow<string>('DB_USER'),
          password: config.getOrThrow<string>('DB_PASSWORD'),
          database: config.getOrThrow<string>('DB_NAME'),
        })
        return drizzle({
          client: pool,
          schema,
          casing: 'snake_case',
        }) as NodePgDatabase<typeof schema>
      },
    },
  ],
  exports: [DrizzleDB],
})
export class DrizzleModule {}
