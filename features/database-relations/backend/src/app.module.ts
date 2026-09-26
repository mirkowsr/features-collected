import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { DrizzleModule } from './db/drizzle.module'
import { CustomersModule } from './customers/customers.module'
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    CustomersModule,
    OrdersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
