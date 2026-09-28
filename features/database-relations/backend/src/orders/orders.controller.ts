import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  orders() {
    return this.ordersService.orders()
  }

  @Get(':id/details')
  orderDetails(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.orderDetails(id)
  }

  @Get('/customer-details')
  customerDetails() {
    return this.ordersService.customerDetails()
  }
}
