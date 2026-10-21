import type { ZodError } from 'zod'

// TODO: this can be splitted to dedicated classes - dynamic and regular validation uses it both
// we can create dedicated per class utility

export function formatZodErrors(error: ZodError, key = '') {
  const map = new Map<string, string[]>()

  for (const issue of error.issues) {
    const field = issue.path.join('.')
    const messages = map.get(field) ?? []

    const resolvedField = field.length ? field : key

    messages.push(issue.message)
    map.set(resolvedField, messages)
  }

  return Array.from(map, ([field, message]) => ({
    field,
    message,
    isValid: false,
  }))
}
