import { z } from 'zod'

export const Name = z.string().min(1)
