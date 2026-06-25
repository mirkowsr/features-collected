import { ZodError } from 'zod'

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
