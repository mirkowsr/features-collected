import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import to from 'await-to-js'
import { products } from '../db/schema'
import { Products } from './validation/products'

@Injectable()
export class ProductsService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

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
    const [bulkInsertError, insertData] = await to(
      this.db.transaction((tx) =>
        tx
          .insert(products)
          .values(productsPayload)
          .returning({ id: products.productId }),
      ),
    )

    if (bulkInsertError) {
      throw new InternalServerErrorException('Error while inserting products')
    }

    return insertData
  }
}
