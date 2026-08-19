import { z } from 'zod'

export const createSongSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(150, 'Title must be at most 150 characters'),

  artist: z
    .string()
    .min(1, 'Artist is required')
    .max(150, 'Artist must be at most 150 characters'),

  songStatus: z.enum([
    'LEARNING',
    'NEEDS_WORK',
    'SHREDDING',
  ]),

  notes: z
    .string()
    .max(2000, 'Notes must be at most 2000 characters'),

  bpm: z
    .number()
    .min(1, 'BPM must be at least 1')
    .max(400, 'BPM must be at most 400')
    .nullable(),

  songKey: z
    .string()
    .max(20, 'Key must be at most 20 characters'),

  durationMinutes: z
    .number()
    .positive('Duration must be greater than 0')
    .nullable(),
})

export type CreateSongFormData = z.infer<
  typeof createSongSchema
>