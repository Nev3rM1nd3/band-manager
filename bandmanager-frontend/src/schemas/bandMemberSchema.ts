import { z } from 'zod'

export const createBandMemberSchema = z.object({
  firstname: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be at most 50 characters'),

  lastname: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be at most 50 characters'),

  position: z
    .string()
    .min(1, 'Position is required')
    .max(50, 'Position must be at most 50 characters'),

  bandRole: z.enum(['OWNER', 'MEMBER']),
})

export type CreateBandMemberFormData = z.infer<
  typeof createBandMemberSchema
>