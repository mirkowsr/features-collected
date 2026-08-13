import * as z from 'zod'

export const EmailSendSchema = z.object({
  userId: z.string(),
  templateId: z.number(),
  subject: z.string(),
})
