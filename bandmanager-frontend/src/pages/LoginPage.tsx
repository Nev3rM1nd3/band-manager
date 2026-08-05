import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../schemas/authSchema'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginUser } from '../api/authApi'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setLoginError('')

      const response = await loginUser(data)

      localStorage.setItem('token', response.token)

      navigate('/')
    } catch {
      setLoginError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            autoComplete="current-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            {...register('password')}
          />

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {loginError && (
          <p className="text-center text-sm text-red-400">
            {loginError}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  )
}

export default LoginPage