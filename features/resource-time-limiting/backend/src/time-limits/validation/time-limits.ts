import { z } from 'zod'
import { ResourceTypes } from '../../db/schema/time-limits'

export const TimeLimitSchema = z.object({
  resource_id: z.uuid(),
  resource_type: z.enum(ResourceTypes),
  valid_till: z.coerce.date().refine((val) => new Date(val) > new Date(), {
    message: 'Date should be from future',
  }),
})

export type TimeLimitDto = z.infer<typeof TimeLimitSchema>
