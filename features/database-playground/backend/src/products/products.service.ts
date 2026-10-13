import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import to from 'await-to-js'
import { products } from '../db/schema'
import { Products } from './validation/products'
import { sql, isNotNull } from 'drizzle-orm'

@Injectable()
export class ProductsService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  private normalize() {
    return (name: string) => name.trim().toLowerCase()
  }

  async products() {
    const [productsError, productsData] = await to(
      this.db.select().from(products),
    )

    if (productsError) {
      throw new InternalServerErrorException(
        'Error while querying products table',
      )
    }

    return productsData
  }

  async bulkInsertProducts(productsPayload: Products[]) {
    const normalize = this.normalize()

    const [existingError, existingRows = []] = await to(
      this.db
        .selectDistinct({ name: sql<string>`lower(${products.product})` })
        .from(products)
        .where(isNotNull(products.product)),
    )

    if (existingError) {
      throw new InternalServerErrorException(
        'Error while checking existing products',
      )
    }

    const known = new Set(existingRows.map((row) => row.name))
    const unique: Products[] = []
    const duplicates: Products[] = []

    for (const item of productsPayload) {
      const key = normalize(item.product)
      if (known.has(key)) {
        duplicates.push(item)
      } else {
        known.add(key)
        unique.push(item)
      }
    }

    if (unique.length === 0) {
      return { inserted: [], duplicates }
    }

    const [bulkInsertError, inserted] = await to(
      this.db.transaction((tx) =>
        tx
          .insert(products)
          .values(unique)
          .returning({ id: products.productId, product: products.product }),
      ),
    )

    if (bulkInsertError) {
      throw new InternalServerErrorException('Error while inserting products')
    }

    return { inserted, duplicates }
  }
}
