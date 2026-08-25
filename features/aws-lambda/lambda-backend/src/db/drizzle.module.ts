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
          host: config.getOrThrow('DB_HOST', 'localhost'),
          port: config.getOrThrow<number>('DB_PORT', 5432),
          user: config.getOrThrow('DB_USER', 'postgres'),
          password: config.getOrThrow('DB_PASSWORD', 'postgres'),
          database: config.getOrThrow('DB_NAME', 'features'),
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
