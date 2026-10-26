export type QueueEvent<TEventPayloads extends Record<string, unknown>> = {
  [K in keyof TEventPayloads]: {
    type: K
    payload: TEventPayloads[K]
    version: number
    timestamp: string
    eventId: string
  }
}[keyof TEventPayloads]
