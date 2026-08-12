import { BulkSendSchema } from '../validation-schema/bulk-send'
import * as z from 'zod'

export type TemplateBody = z.infer<typeof BulkSendSchema>
