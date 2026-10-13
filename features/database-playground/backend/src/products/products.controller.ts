import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../common/pipes/ZodValidationPipe'
import { ProductsService } from './products.service'
import { BulkInsertsProductsSchema, Products } from './validation/products'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  products() {
    return this.productsService.products()
  }

  @Post('/bulk')
  @UsePipes(new ZodValidationPipe(BulkInsertsProductsSchema))
  bulkInsertProducts(@Body() payload: Products[]) {
    return this.productsService.bulkInsertProducts(payload)
  }
}
