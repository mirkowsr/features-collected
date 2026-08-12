import { EmailSendSchema } from '../validation-schema/email-send'
import * as z from 'zod'

export type RecipientDTO = z.infer<typeof EmailSendSchema>
