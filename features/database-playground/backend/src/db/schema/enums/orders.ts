import * as p from 'drizzle-orm/pg-core'

export const OrderStatusEnum = {
  Ordered: 'Ordered',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
} as const

export type OrderStatus = (typeof OrderStatusEnum)[keyof typeof OrderStatusEnum]

export const orderStatusEnum = p.pgEnum(
  'order_status',
  Object.values(OrderStatusEnum) as [string, ...string[]],
)
