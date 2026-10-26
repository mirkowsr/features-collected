import type { QueueEvent } from './event.type'

export function eventFactory<TEventPayloads extends Record<string, unknown>>() {
  return function createQueueEvent<K extends keyof TEventPayloads>(
    type: K,
    payload: TEventPayloads[K],
  ): QueueEvent<TEventPayloads> {
    return {
      type,
      payload,
      version: 1,
      timestamp: new Date().toISOString(),
      eventId: crypto.randomUUID(),
    }
  }
}
