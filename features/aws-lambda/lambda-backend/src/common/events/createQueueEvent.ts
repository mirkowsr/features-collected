import { eventFactory } from '@repo/backend-events'
import type { EventPayloads } from './event.payloads'

export const createQueueEvent = eventFactory<EventPayloads>()
