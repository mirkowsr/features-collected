import * as z from 'zod'

export const TemplateBodySchema = z.object({
  name: z.string(),
})
