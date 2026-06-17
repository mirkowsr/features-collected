import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  age: z.coerce.number().int().min(1).optional(),
  email: z.email(),
})

export type UserDto = z.infer<typeof UserSchema>
