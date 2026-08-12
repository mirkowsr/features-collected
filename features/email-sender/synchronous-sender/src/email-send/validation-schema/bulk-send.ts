import * as z from 'zod'

export const BulkSendSchema = z.object({
  templateId: z.number(),
  subject: z.string(),
})
