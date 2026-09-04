import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'

async function seed() {
  const pool = new Pool({
    host: process.env['DB_HOST'] ?? 'localhost',
    port: Number(process.env['DB_PORT'] ?? 5432),
    user: process.env['DB_USER'] ?? 'postgres',
    password: process.env['DB_PASSWORD'] ?? 'postgres',
    database: process.env['DB_NAME'] ?? 'features',
  })

  const db = drizzle({ client: pool, schema, casing: 'snake_case' })

  const usersData = [
    { name: 'Alice Johnson' },
    { name: 'Bob Smith' },
    { name: 'Charlie Brown' },
    { name: 'Diana Prince' },
  ]

  const usersToInsert = usersData.map((user) => ({
    id: randomUUID(),
    ...user,
  }))

  console.log(`Inserting ${usersToInsert.length} users...`)
  await db.insert(schema.users).values(usersToInsert)
  console.log('Users inserted successfully')

  await pool.end()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
