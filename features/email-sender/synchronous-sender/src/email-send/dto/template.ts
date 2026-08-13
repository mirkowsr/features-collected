import type { BulkSendSchema } from '../validation-schema/bulk-send'
import type * as z from 'zod'

export type TemplateBody = z.infer<typeof BulkSendSchema>
