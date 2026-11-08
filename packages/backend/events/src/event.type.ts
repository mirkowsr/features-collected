export type QueueEventOf<
  TEventPayloads extends Record<string, unknown>,
  K extends keyof TEventPayloads,
> = {
  type: K
  payload: TEventPayloads[K]
  version: number
  timestamp: string
  eventId: string
}

export type QueueEvent<TEventPayloads extends Record<string, unknown>> = {
  [K in keyof TEventPayloads]: QueueEventOf<TEventPayloads, K>
}[keyof TEventPayloads]
