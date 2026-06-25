import 'reflect-metadata'

import dotenv from 'dotenv'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './db/schema'

dotenv.config()

const images: (typeof schema.images.$inferInsert)[] = [
  {
    title: 'Mountain Sunset',
    alt_text: 'Sunset over mountain peaks',
    url: 'https://placehold.co/600x400',
    width: 600,
    height: 400,
    file_size: 24576,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Ocean Waves',
    alt_text: 'Crashing ocean waves on shore',
    url: 'https://placehold.co/800x600',
    width: 800,
    height: 600,
    file_size: 32768,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Forest Path',
    alt_text: 'A winding path through a green forest',
    url: 'https://placehold.co/1024x768',
    width: 1024,
    height: 768,
    file_size: 45000,
    mime_type: 'image/jpeg',
  },
  {
    title: 'City Skyline',
    alt_text: 'Modern city skyline at dusk',
    url: 'https://placehold.co/1200x800',
    width: 1200,
    height: 800,
    file_size: 51200,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Abstract Art',
    alt_text: 'Colorful abstract geometric pattern',
    url: 'https://placehold.co/400x400',
    width: 400,
    height: 400,
    file_size: 18432,
    mime_type: 'image/png',
  },
  {
    title: 'Desert Dunes',
    alt_text: 'Rolling sand dunes at golden hour',
    url: 'https://placehold.co/800x500',
    width: 800,
    height: 500,
    file_size: 28672,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Starry Night',
    alt_text: 'Night sky filled with stars',
    url: 'https://placehold.co/900x600',
    width: 900,
    height: 600,
    file_size: 38912,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Vintage Car',
    alt_text: 'Restored classic red convertible',
    url: 'https://placehold.co/640x480',
    width: 640,
    height: 480,
    file_size: 21504,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Tropical Beach',
    alt_text: 'White sand beach with palm trees',
    url: 'https://placehold.co/1200x900',
    width: 1200,
    height: 900,
    file_size: 56320,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Tech Workspace',
    alt_text: 'Modern desk setup with dual monitors',
    url: 'https://placehold.co/800x600',
    width: 800,
    height: 600,
    file_size: 30720,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Wildlife Portrait',
    alt_text: 'Close-up of a majestic eagle',
    url: 'https://placehold.co/600x750',
    width: 600,
    height: 750,
    file_size: 34816,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Waterfall',
    alt_text: 'Cascading waterfall in lush jungle',
    url: 'https://placehold.co/800x1000',
    width: 800,
    height: 1000,
    file_size: 40960,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Minimalist Logo',
    alt_text: 'Simple geometric logo design',
    url: 'https://placehold.co/300x300',
    width: 300,
    height: 300,
    file_size: 12288,
    mime_type: 'image/png',
  },
  {
    title: 'Autumn Leaves',
    alt_text: 'Colorful autumn leaves on ground',
    url: 'https://placehold.co/900x600',
    width: 900,
    height: 600,
    file_size: 36864,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Bicycle',
    alt_text: 'Vintage bicycle against brick wall',
    url: 'https://placehold.co/700x500',
    width: 700,
    height: 500,
    file_size: 24576,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Cafe Interior',
    alt_text: 'Cozy coffee shop interior',
    url: 'https://placehold.co/1000x667',
    width: 1000,
    height: 667,
    file_size: 43008,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Hiking Trail',
    alt_text: 'Scenic mountain hiking trail',
    url: 'https://placehold.co/1100x700',
    width: 1100,
    height: 700,
    file_size: 49152,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Icon Set',
    alt_text: 'Collection of flat design icons',
    url: 'https://placehold.co/512x512',
    width: 512,
    height: 512,
    file_size: 20480,
    mime_type: 'image/png',
  },
  {
    title: 'Rainy Street',
    alt_text: 'City street reflecting neon lights in rain',
    url: 'https://placehold.co/1000x600',
    width: 1000,
    height: 600,
    file_size: 45056,
    mime_type: 'image/jpeg',
  },
  {
    title: 'Food Photography',
    alt_text: 'Gourmet dish plated on slate',
    url: 'https://placehold.co/800x800',
    width: 800,
    height: 800,
    file_size: 37888,
    mime_type: 'image/jpeg',
  },
]

async function main() {
  const pool = new Pool({
    host: process.env['DB_HOST'] ?? 'localhost',
    port: Number(process.env['DB_PORT'] ?? 5432),
    user: process.env['DB_USER'] ?? 'postgres',
    password: process.env['DB_PASSWORD'] ?? 'postgres',
    database: process.env['DB_NAME'] ?? 'features',
  })

  const db = drizzle({ client: pool, schema, casing: 'snake_case' })

  await db.insert(schema.images).values(images)

  console.log(`Seeded ${images.length} images successfully.`)

  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
