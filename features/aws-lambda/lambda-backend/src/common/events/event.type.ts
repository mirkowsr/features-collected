import type { QueueEvent as GenericQueueEvent } from '@repo/backend-events'
import type { EventPayloads } from './event.payloads'

export type QueueEvent = GenericQueueEvent<EventPayloads>
