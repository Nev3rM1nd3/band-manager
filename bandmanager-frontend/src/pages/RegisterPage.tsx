import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/authSchema'
import { registerUser } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [registerError, setRegisterError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      setRegisterError('')

      const response = await registerUser(data)

      login(response.token)

      navigate('/')
    } catch {
      setRegisterError('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">
        Register
      </h1>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="firstname"
          >
            First name
          </label>

          <input
            id="firstname"
            type="text"
            autoComplete="given-name"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            {...register('firstname')}
          />

          {errors.firstname && (
            <p className="mt-2 text-sm text-red-400">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="lastname"
          >
            Last name
          </label>

          <input
            id="lastname"
            type="text"
            autoComplete="family-name"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            {...register('lastname')}
          />

          {errors.lastname && (
            <p className="mt-2 text-sm text-red-400">
              {errors.lastname.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="email"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            {...register('email')}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="password"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            {...register('password')}
          />

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {registerError && (
          <p className="text-center text-sm text-red-400">
            {registerError}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-violet-400 hover:text-violet-300"
        >
          Login
        </Link>
      </p>
    </>
  )
}

export default RegisterPage