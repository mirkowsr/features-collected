import 'dotenv/config'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema'

/**
 * Seed script for the canonical `salesdb` course dataset.
 *
 * The source SQL uses INT primary keys (customerid 1–5, employeeid 1–5,
 * productid 101–105, orderid 1–10), but the Drizzle schema uses random UUIDs.
 * This script therefore captures each generated UUID via `.returning()` and
 * keeps maps keyed by the canonical INT id so foreign keys and the archive's
 * copied `orderId` values can be wired to the correct UUID.
 *
 * Run with `pnpm tsx src/db/seed.ts` (from the backend package directory).
 */

type Database = NodePgDatabase<typeof schema>

type SeedContext = {
  employeesById: Map<number, string>
  customersById: Map<number, string>
  productsById: Map<number, string>
  ordersById: Map<number, string>
}

/**
 * Zip canonical INT ids with the UUIDs returned by `.returning()`. Postgres
 * returns inserted rows in insertion order, so values inserted in ascending
 * canonical-id order map positionally onto `ids`.
 */
const zipIds = (
  ids: number[],
  returned: { id: string }[],
): Map<number, string> => {
  const map = new Map<number, string>()
  ids.forEach((id, index) => {
    const row = returned[index]
    if (!row)
      throw new Error(`seed: expected a returned id for canonical id ${id}`)
    map.set(id, row.id)
  })
  return map
}

/** Resolve a required FK, failing loudly if the canonical id was never seeded. */
const resolveId = (map: Map<number, string>, id: number): string => {
  const uuid = map.get(id)
  if (!uuid) throw new Error(`seed: missing uuid for canonical id ${id}`)
  return uuid
}

async function seedEmployees(db: Database): Promise<Map<number, string>> {
  await db.delete(schema.employees)

  // Canonical employees keyed by INT id 1–5. `managerId` holds the INT id of
  // the manager (null for the root), resolved to a UUID during insertion since
  // employees self-reference each other.
  const rows = [
    {
      firstName: 'Frank',
      lastName: 'Lee',
      department: 'Marketing',
      birthDate: '1988-12-05',
      gender: 'M',
      salary: 55000,
      managerId: null,
    },
    {
      firstName: 'Kevin',
      lastName: 'Brown',
      department: 'Marketing',
      birthDate: '1972-11-25',
      gender: 'M',
      salary: 65000,
      managerId: 1,
    },
    {
      firstName: 'Mary',
      lastName: null,
      department: 'Sales',
      birthDate: '1986-01-05',
      gender: 'F',
      salary: 75000,
      managerId: 1,
    },
    {
      firstName: 'Michael',
      lastName: 'Ray',
      department: 'Sales',
      birthDate: '1977-02-10',
      gender: 'M',
      salary: 90000,
      managerId: 2,
    },
    {
      firstName: 'Carol',
      lastName: 'Baker',
      department: 'Sales',
      birthDate: '1982-02-11',
      gender: 'F',
      salary: 55000,
      managerId: 3,
    },
  ]

  const employeesById = new Map<number, string>()
  for (const [index, row] of rows.entries()) {
    const canonicalId = index + 1

    // Canonical order is topological: a manager always precedes its reports,
    // so the manager's UUID is already captured by the time it is referenced.
    let managerId: string | null = null
    if (row.managerId !== null) {
      managerId = employeesById.get(row.managerId) ?? null
      if (!managerId)
        throw new Error(
          `seed: missing manager uuid for employee ${canonicalId}`,
        )
    }

    const [inserted] = await db
      .insert(schema.employees)
      .values({
        firstName: row.firstName,
        lastName: row.lastName,
        department: row.department,
        birthDate: row.birthDate,
        gender: row.gender,
        salary: row.salary,
        managerId,
      })
      .returning({ employeeId: schema.employees.employeeId })
    if (!inserted)
      throw new Error(`seed: no row returned for employee ${canonicalId}`)
    employeesById.set(canonicalId, inserted.employeeId)
  }

  return employeesById
}

async function seedCustomers(db: Database): Promise<Map<number, string>> {
  await db.delete(schema.customers)

  const ids = [1, 2, 3, 4, 5]
  const rows = [
    {
      firstName: 'Jossef',
      lastName: 'Goldberg',
      country: 'Germany',
      score: 350,
    },
    { firstName: 'Kevin', lastName: 'Brown', country: 'USA', score: 900 },
    { firstName: 'Mary', lastName: null, country: 'USA', score: 750 },
    { firstName: 'Mark', lastName: 'Schwarz', country: 'Germany', score: 500 },
    { firstName: 'Anna', lastName: 'Adams', country: 'USA', score: null },
  ]

  const returned = await db
    .insert(schema.customers)
    .values(rows)
    .returning({ id: schema.customers.customerId })
  return zipIds(ids, returned)
}

async function seedProducts(db: Database): Promise<Map<number, string>> {
  await db.delete(schema.products)

  const ids = [101, 102, 103, 104, 105]
  const rows = [
    { product: 'Bottle', category: 'Accessories', price: '10' },
    { product: 'Tire', category: 'Accessories', price: '15' },
    { product: 'Socks', category: 'Clothing', price: '20' },
    { product: 'Caps', category: 'Clothing', price: '25' },
    { product: 'Gloves', category: 'Clothing', price: '30' },
  ]

  const returned = await db
    .insert(schema.products)
    .values(rows)
    .returning({ id: schema.products.productId })
  return zipIds(ids, returned)
}

async function seedOrders(
  db: Database,
  context: Pick<
    SeedContext,
    'employeesById' | 'customersById' | 'productsById'
  >,
): Promise<Map<number, string>> {
  await db.delete(schema.orders)

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // FK columns hold canonical INT ids, resolved to UUIDs below.
  const rows = [
    {
      productId: 101,
      customerId: 2,
      salespersonId: 3,
      orderDate: '2025-01-01',
      shipDate: '2025-01-05',
      orderStatus: 'Delivered',
      shipAddress: '9833 Mt. Dias Blv.',
      billAddress: '1226 Shoe St.',
      quantity: 1,
      sales: 10,
      creationTime: new Date('2025-01-01T12:34:56'),
    },
    {
      productId: 102,
      customerId: 3,
      salespersonId: 3,
      orderDate: '2025-01-05',
      shipDate: '2025-01-10',
      orderStatus: 'Shipped',
      shipAddress: '250 Race Court',
      billAddress: null,
      quantity: 1,
      sales: 15,
      creationTime: new Date('2025-01-05T23:22:04'),
    },
    {
      productId: 101,
      customerId: 1,
      salespersonId: 5,
      orderDate: '2025-01-10',
      shipDate: '2025-01-25',
      orderStatus: 'Delivered',
      shipAddress: '8157 W. Book',
      billAddress: '8157 W. Book',
      quantity: 2,
      sales: 20,
      creationTime: new Date('2025-01-10T18:24:08'),
    },
    {
      productId: 105,
      customerId: 1,
      salespersonId: 3,
      orderDate: '2025-01-20',
      shipDate: '2025-01-25',
      orderStatus: 'Shipped',
      shipAddress: '5724 Victory Lane',
      billAddress: '',
      quantity: 2,
      sales: 60,
      creationTime: new Date('2025-01-20T05:50:33'),
    },
    {
      productId: 104,
      customerId: 2,
      salespersonId: 5,
      orderDate: '2025-02-01',
      shipDate: '2025-02-05',
      orderStatus: 'Delivered',
      shipAddress: null,
      billAddress: null,
      quantity: 1,
      sales: 25,
      creationTime: new Date('2025-02-01T14:02:41'),
    },
    {
      productId: 104,
      customerId: 3,
      salespersonId: 5,
      orderDate: '2025-02-05',
      shipDate: '2025-02-10',
      orderStatus: 'Delivered',
      shipAddress: '1792 Belmont Rd.',
      billAddress: null,
      quantity: 2,
      sales: 50,
      creationTime: new Date('2025-02-06T15:34:57'),
    },
    {
      productId: 102,
      customerId: 1,
      salespersonId: 1,
      orderDate: '2025-02-15',
      shipDate: '2025-02-27',
      orderStatus: 'Delivered',
      shipAddress: '136 Balboa Court',
      billAddress: '',
      quantity: 2,
      sales: 30,
      creationTime: new Date('2025-02-16T06:22:01'),
    },
    {
      productId: 101,
      customerId: 4,
      salespersonId: 3,
      orderDate: '2025-02-18',
      shipDate: '2025-02-27',
      orderStatus: 'Shipped',
      shipAddress: '2947 Vine Lane',
      billAddress: '4311 Clay Rd',
      quantity: 3,
      sales: 90,
      creationTime: new Date('2025-02-18T10:45:22'),
    },
    {
      productId: 101,
      customerId: 2,
      salespersonId: 3,
      orderDate: '2025-03-10',
      shipDate: '2025-03-15',
      orderStatus: 'Shipped',
      shipAddress: '3768 Door Way',
      billAddress: '',
      quantity: 2,
      sales: 20,
      creationTime: new Date('2025-03-10T12:59:04'),
    },
    {
      productId: 102,
      customerId: 3,
      salespersonId: 5,
      orderDate: '2025-03-15',
      shipDate: '2025-03-20',
      orderStatus: 'Shipped',
      shipAddress: null,
      billAddress: null,
      quantity: 0,
      sales: 60,
      creationTime: new Date('2025-03-16T23:25:15'),
    },
  ]

  const values = rows.map((row) => ({
    productId: resolveId(context.productsById, row.productId),
    customerId: resolveId(context.customersById, row.customerId),
    salespersonId: resolveId(context.employeesById, row.salespersonId),
    orderDate: row.orderDate,
    shipDate: row.shipDate,
    orderStatus: row.orderStatus,
    shipAddress: row.shipAddress,
    billAddress: row.billAddress,
    quantity: row.quantity,
    sales: row.sales,
    creationTime: row.creationTime,
  }))

  const returned = await db
    .insert(schema.orders)
    .values(values)
    .returning({ id: schema.orders.orderId })
  return zipIds(ids, returned)
}

async function seedArchive(db: Database, context: SeedContext): Promise<void> {
  await db.delete(schema.ordersarchive)

  // Canonical archive rows. `orderId` intentionally reuses the UUID of the
  // matching canonical `orders` row (e.g. both `orderId = 4` rows share
  // orders[4]'s UUID) to preserve UNION/EXCEPT lesson semantics. The archive
  // has no FK constraint, so this is a copied value, not a reference.
  const rows = [
    {
      orderId: 1,
      productId: 101,
      customerId: 2,
      salespersonId: 3,
      orderDate: '2024-04-01',
      shipDate: '2024-04-05',
      orderStatus: 'Shipped',
      shipAddress: '123 Main St',
      billAddress: '456 Billing St',
      quantity: 1,
      sales: 10,
      creationTime: new Date('2024-04-01T12:34:56'),
    },
    {
      orderId: 2,
      productId: 102,
      customerId: 3,
      salespersonId: 3,
      orderDate: '2024-04-05',
      shipDate: '2024-04-10',
      orderStatus: 'Shipped',
      shipAddress: '456 Elm St',
      billAddress: '789 Billing St',
      quantity: 1,
      sales: 15,
      creationTime: new Date('2024-04-05T23:22:04'),
    },
    {
      orderId: 3,
      productId: 101,
      customerId: 1,
      salespersonId: 4,
      orderDate: '2024-04-10',
      shipDate: '2024-04-25',
      orderStatus: 'Shipped',
      shipAddress: '789 Maple St',
      billAddress: '789 Maple St',
      quantity: 2,
      sales: 20,
      creationTime: new Date('2024-04-10T18:24:08'),
    },
    {
      orderId: 4,
      productId: 105,
      customerId: 1,
      salespersonId: 3,
      orderDate: '2024-04-20',
      shipDate: '2024-04-25',
      orderStatus: 'Shipped',
      shipAddress: '987 Victory Lane',
      billAddress: '',
      quantity: 2,
      sales: 60,
      creationTime: new Date('2024-04-20T05:50:33'),
    },
    {
      orderId: 4,
      productId: 105,
      customerId: 1,
      salespersonId: 3,
      orderDate: '2024-04-20',
      shipDate: '2024-04-25',
      orderStatus: 'Delivered',
      shipAddress: '987 Victory Lane',
      billAddress: '',
      quantity: 2,
      sales: 60,
      creationTime: new Date('2024-04-20T14:50:33'),
    },
    {
      orderId: 5,
      productId: 104,
      customerId: 2,
      salespersonId: 5,
      orderDate: '2024-05-01',
      shipDate: '2024-05-05',
      orderStatus: 'Shipped',
      shipAddress: '345 Oak St',
      billAddress: '678 Pine St',
      quantity: 1,
      sales: 25,
      creationTime: new Date('2024-05-01T14:02:41'),
    },
    {
      orderId: 6,
      productId: 104,
      customerId: 3,
      salespersonId: 5,
      orderDate: '2024-05-05',
      shipDate: '2024-05-10',
      orderStatus: 'Delivered',
      shipAddress: '543 Belmont Rd.',
      billAddress: null,
      quantity: 2,
      sales: 50,
      creationTime: new Date('2024-05-06T15:34:57'),
    },
    {
      orderId: 6,
      productId: 104,
      customerId: 3,
      salespersonId: 5,
      orderDate: '2024-05-05',
      shipDate: '2024-05-10',
      orderStatus: 'Delivered',
      shipAddress: '543 Belmont Rd.',
      billAddress: '3768 Door Way',
      quantity: 2,
      sales: 50,
      creationTime: new Date('2024-05-07T13:22:05'),
    },
    {
      orderId: 6,
      productId: 101,
      customerId: 3,
      salespersonId: 5,
      orderDate: '2024-05-05',
      shipDate: '2024-05-10',
      orderStatus: 'Delivered',
      shipAddress: '543 Belmont Rd.',
      billAddress: '3768 Door Way',
      quantity: 2,
      sales: 50,
      creationTime: new Date('2024-05-12T20:36:55'),
    },
    {
      orderId: 7,
      productId: 102,
      customerId: 3,
      salespersonId: 5,
      orderDate: '2024-06-15',
      shipDate: '2024-06-20',
      orderStatus: 'Shipped',
      shipAddress: '111 Main St',
      billAddress: '222 Billing St',
      quantity: 0,
      sales: 60,
      creationTime: new Date('2024-06-16T23:25:15'),
    },
  ]

  const values = rows.map((row) => ({
    orderId: resolveId(context.ordersById, row.orderId),
    productId: resolveId(context.productsById, row.productId),
    customerId: resolveId(context.customersById, row.customerId),
    salespersonId: resolveId(context.employeesById, row.salespersonId),
    orderDate: row.orderDate,
    shipDate: row.shipDate,
    orderStatus: row.orderStatus,
    shipAddress: row.shipAddress,
    billAddress: row.billAddress,
    quantity: row.quantity,
    sales: row.sales,
    creationTime: row.creationTime,
  }))

  await db.insert(schema.ordersarchive).values(values)
}

async function seed(): Promise<void> {
  const pool = new Pool({
    host: process.env['DB_HOST'] ?? 'localhost',
    port: Number(process.env['DB_PORT'] ?? 5432),
    user: process.env['DB_USER'] ?? 'postgres',
    password: process.env['DB_PASSWORD'] ?? 'postgres',
    database: process.env['DB_NAME'] ?? 'features',
  })
  const db = drizzle({ client: pool, schema, casing: 'snake_case' }) as Database

  try {
    const employeesById = await seedEmployees(db)
    const customersById = await seedCustomers(db)
    const productsById = await seedProducts(db)
    const ordersById = await seedOrders(db, {
      employeesById,
      customersById,
      productsById,
    })
    await seedArchive(db, {
      employeesById,
      customersById,
      productsById,
      ordersById,
    })

    console.log(
      `Seed complete: ${employeesById.size} employees, ${customersById.size} customers, ` +
        `${productsById.size} products, ${ordersById.size} orders, and the ordersarchive copy.`,
    )
  } finally {
    await pool.end()
  }
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
