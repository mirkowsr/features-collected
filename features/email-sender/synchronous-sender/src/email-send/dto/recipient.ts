import type { EmailSendSchema } from '../validation-schema/email-send'
import type * as z from 'zod'

export type RecipientDTO = z.infer<typeof EmailSendSchema>
