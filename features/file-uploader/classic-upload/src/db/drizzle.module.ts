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
          host: config.get('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 5432),
          user: config.get('DB_USER', 'postgres'),
          password: config.get('DB_PASSWORD', 'postgres'),
          database: config.get('DB_NAME', 'features'),
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
