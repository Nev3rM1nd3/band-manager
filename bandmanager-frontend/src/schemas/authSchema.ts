import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email'),

  password: z
    .string()
    .min(1, 'Password is required'),
})

export const registerSchema = z.object({
  firstname: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be at most 50 characters'),

  lastname: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be at most 50 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email')
    .max(255, 'Email must be at most 255 characters'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>