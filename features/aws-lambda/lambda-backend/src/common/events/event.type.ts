import type { EventPayloads } from './event.payloads'

type Variant<K extends keyof EventPayloads> = {
  type: K
  payload: EventPayloads[K]
  version: number
  timestamp: string
  eventId: string
}

/*

 Below shape and QueueEvent generic creates correlated union that 
 allow to narrow down payload based on type 
 
 f.ex:
 type QueueEvent =
  | { type: 'user.created'; payload: { name: string }; ... }
  | { type: 'order.placed'; payload: { orderId: string; total: number }; ... } 
 */

export type QueueEvent = {
  [K in keyof EventPayloads]: Variant<K>
}[keyof EventPayloads]

export type QueueEventOf<K extends keyof EventPayloads> = Variant<K>
