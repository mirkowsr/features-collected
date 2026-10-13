import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { DrizzleModule } from './db/drizzle.module'
import { CustomersModule } from './customers/customers.module'
import { OrdersModule } from './orders/orders.module';
import { EmployeesModule } from './employees/employees.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    CustomersModule,
    OrdersModule,
    EmployeesModule,
    AnalyticsModule,
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
