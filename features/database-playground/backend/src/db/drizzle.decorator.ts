import { Inject } from '@nestjs/common'

import { DrizzleDB } from './drizzle.module'

/**
 * Ergonomic wrapper around `@Inject(DrizzleDB)`.
 *
 * Usage:
 *   constructor(@InjectDrizzle() private db: DrizzleSchema) {}
 *
 * Mirrors the feel of `@InjectRepository()` from `@nestjs/typeorm`.
 */
export const InjectDrizzle = () => Inject(DrizzleDB)
