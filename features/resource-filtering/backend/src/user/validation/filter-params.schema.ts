import { z } from 'zod'

export const UserFilterQuerySchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(0).optional(),
  order: z
    .string()
    .trim()
    .pipe(z.enum(['asc', 'desc']))
    .optional(),
  orderBy: z
    .string()
    .trim()
    .pipe(z.enum(['id', 'lastName', 'firstName']))
    .optional(),
})

export type UserFilterQuery = z.infer<typeof UserFilterQuerySchema>
