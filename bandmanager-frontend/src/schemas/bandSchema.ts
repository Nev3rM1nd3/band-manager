import { z } from 'zod'

export const createBandSchema = z.object({
  name: z
    .string()
    .min(1, 'Band name is required')
    .max(100, 'Band name must be at most 100 characters'),

  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters'),

  genres: z
    .array(
      z
        .string()
        .min(1, 'Genre cannot be empty')
        .max(50, 'Genre must be at most 50 characters'),
    ),
})

export type CreateBandFormData = z.infer<typeof createBandSchema>