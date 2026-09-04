type UserCreatedEventPayload = {
  name: string
}

export type EventPayloads = {
  'user.created': UserCreatedEventPayload
}
