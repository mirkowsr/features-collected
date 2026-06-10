import { ZodError } from 'zod'

export function formatZodErrors(error: ZodError) {
  const map = new Map<string, string[]>()

  for (const issue of error.issues) {
    const field = issue.path.join('.')
    const messages = map.get(field) ?? []

    messages.push(issue.message)
    map.set(field, messages)
  }

  return Array.from(map, ([field, message]) => ({ field, message }))
}
