import { z } from 'zod'

export const createRehearsalSchema = z
  .object({
    startDate: z
      .string()
      .min(1, 'Start date is required'),

    startTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        'Use 24-hour format, for example 18:00',
      ),

    endDate: z
      .string()
      .nullable(),

    endTime: z
      .string()
      .nullable()
      .refine(
        (value) =>
          value === null ||
          /^([01]\d|2[0-3]):[0-5]\d$/.test(value),
        'Use 24-hour format, for example 18:00',
      ),

    location: z
      .string()
      .min(1, 'Location is required')
      .max(255, 'Location must be at most 255 characters'),

    notes: z
      .string()
      .max(2000, 'Notes must be at most 2000 characters'),
  })
  .refine(
    (data) => {
      const validTime =
        /^([01]\d|2[0-3]):[0-5]\d$/.test(data.startTime)

      if (!data.startDate || !validTime) {
        return true
      }

      const start = new Date(
        `${data.startDate}T${data.startTime}`,
      )

      return start > new Date()
    },
    {
      message: 'Rehearsal must be scheduled in the future',
      path: ['startDate'],
    },
  )
  .refine(
    (data) => {
      if (!data.endDate && !data.endTime) {
        return true
      }

      return Boolean(data.endDate && data.endTime)
    },
    {
      message: 'End date and end time must both be provided',
      path: ['endTime'],
    },
  )
  .refine(
    (data) => {
      if (!data.endDate || !data.endTime) {
        return true
      }

      const start = new Date(
        `${data.startDate}T${data.startTime}`,
      )

      const end = new Date(
        `${data.endDate}T${data.endTime}`,
      )

      return end > start
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'],
    },
  )

export type CreateRehearsalFormData =
  z.infer<typeof createRehearsalSchema>