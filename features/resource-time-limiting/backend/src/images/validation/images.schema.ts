import { z } from 'zod'

export const ImagesSchema = z.object({
  title: z.string(),
  alt_text: z.string(),
  url: z.url(),
  width: z.number(),
  height: z.number(),
  file_size: z.number(),
  mime_type: z.string(),
})

export type ImageDto = z.infer<typeof ImagesSchema>
