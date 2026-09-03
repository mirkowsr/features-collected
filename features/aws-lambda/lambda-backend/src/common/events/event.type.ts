import type { EventPayloads } from './event.payloads'

type Variant<K extends keyof EventPayloads> = {
  type: K
  payload: EventPayloads[K]
  version: number
  timestamp: string
  eventId: string
}

export type QueueEvent = {
  [K in keyof EventPayloads]: Variant<K>
}[keyof EventPayloads]

export type QueueEventOf<K extends keyof EventPayloads> = Variant<K>
