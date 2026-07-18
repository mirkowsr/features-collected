import 'reflect-metadata'

import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { Gender, User } from './user/user.entity'

dotenv.config()

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'] ?? 'localhost',
  port: Number(process.env['DB_PORT'] ?? 5432),
  username: process.env['DB_USER'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? 'postgres',
  database: process.env['DB_NAME'] ?? 'features',
  entities: [User],
  synchronize: false,
})

async function main() {
  await dataSource.initialize()

  const repository = dataSource.getRepository(User)

  const people: Partial<User>[] = [
    {
      firstName: 'Lukas',
      lastName: 'Müller',
      personalId: 'ID-001',
      age: 34,
      gender: Gender.male,
      country: 'Germany',
      city: 'Berlin',
      isActive: true,
    },
    {
      firstName: 'Sophie',
      lastName: 'Wagner',
      personalId: 'ID-002',
      age: 28,
      gender: Gender.female,
      country: 'Germany',
      city: 'Munich',
      isActive: true,
    },
    {
      firstName: 'James',
      lastName: 'Carter',
      personalId: 'ID-003',
      age: 45,
      gender: Gender.male,
      country: 'USA',
      city: 'New York',
      isActive: true,
    },
    {
      firstName: 'Emily',
      lastName: 'Johnson',
      personalId: 'ID-004',
      age: 22,
      gender: Gender.female,
      country: 'USA',
      city: 'Los Angeles',
      isActive: false,
    },
    {
      firstName: 'Noah',
      lastName: 'Williams',
      personalId: 'ID-005',
      age: 31,
      gender: Gender.male,
      country: 'USA',
      city: 'Chicago',
      isActive: true,
    },
    {
      firstName: 'Camille',
      lastName: 'Dubois',
      personalId: 'ID-006',
      age: 27,
      gender: Gender.female,
      country: 'France',
      city: 'Paris',
      isActive: true,
    },
    {
      firstName: 'Hugo',
      lastName: 'Bernard',
      personalId: 'ID-007',
      age: 53,
      gender: Gender.male,
      country: 'France',
      city: 'Lyon',
      isActive: false,
    },
    {
      firstName: 'Léa',
      lastName: 'Martin',
      personalId: 'ID-008',
      age: 19,
      gender: Gender.female,
      country: 'France',
      city: 'Paris',
      isActive: true,
    },
    {
      firstName: 'Carlos',
      lastName: 'García',
      personalId: 'ID-009',
      age: 41,
      gender: Gender.male,
      country: 'Spain',
      city: 'Madrid',
      isActive: true,
    },
    {
      firstName: 'Sofía',
      lastName: 'López',
      personalId: 'ID-010',
      age: 36,
      gender: Gender.female,
      country: 'Spain',
      city: 'Barcelona',
      isActive: true,
    },
    {
      firstName: 'Marco',
      lastName: 'Rossi',
      personalId: 'ID-011',
      age: 29,
      gender: Gender.male,
      country: 'Italy',
      city: 'Rome',
      isActive: true,
    },
    {
      firstName: 'Giulia',
      lastName: 'Ferrari',
      personalId: 'ID-012',
      age: 24,
      gender: Gender.female,
      country: 'Italy',
      city: 'Milan',
      isActive: false,
    },
    {
      firstName: 'Luca',
      lastName: 'Conti',
      personalId: 'ID-013',
      age: 60,
      gender: Gender.male,
      country: 'Italy',
      city: 'Rome',
      isActive: true,
    },
    {
      firstName: 'Alex',
      lastName: 'Schmidt',
      personalId: 'ID-014',
      age: 33,
      gender: Gender.other,
      country: 'Germany',
      city: 'Hamburg',
      isActive: true,
    },
    {
      firstName: 'Jordan',
      lastName: 'Taylor',
      personalId: 'ID-015',
      age: 18,
      gender: Gender.other,
      country: 'USA',
      city: 'New York',
      isActive: false,
    },
    {
      firstName: 'Anna',
      lastName: 'Becker',
      personalId: 'ID-016',
      age: 47,
      gender: Gender.female,
      country: 'Germany',
      city: 'Berlin',
      isActive: true,
    },
    {
      firstName: 'Matteo',
      lastName: 'Ricci',
      personalId: 'ID-017',
      age: 38,
      gender: Gender.male,
      country: 'Italy',
      city: 'Milan',
      isActive: true,
    },
    {
      firstName: 'Isabella',
      lastName: 'Moreau',
      personalId: 'ID-018',
      age: 55,
      gender: Gender.female,
      country: 'France',
      city: 'Lyon',
      isActive: false,
    },
    {
      firstName: 'Diego',
      lastName: 'Martínez',
      personalId: 'ID-019',
      age: 65,
      gender: Gender.male,
      country: 'Spain',
      city: 'Seville',
      isActive: true,
    },
    {
      firstName: 'Sam',
      lastName: 'Brown',
      personalId: 'ID-020',
      age: 26,
      gender: Gender.other,
      country: 'USA',
      city: 'Chicago',
      isActive: true,
    },
  ]

  await repository.save(people)

  console.log(`Seeded ${people.length} users successfully.`)

  await dataSource.destroy()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
