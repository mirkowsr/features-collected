import type { EventPayloads } from './event.payloads'
import type { QueueEventOf } from './event.type'

export function createQueueEvent<K extends keyof EventPayloads>(
  type: K,
  payload: EventPayloads[K],
): QueueEventOf<K> {
  return {
    type,
    payload,
    version: 1,
    timestamp: new Date().toISOString(),
    eventId: crypto.randomUUID(),
  }
}
