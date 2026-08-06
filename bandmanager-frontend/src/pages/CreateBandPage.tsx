import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { createBand } from '../api/bandsApi'
import { useAuth } from '../context/AuthContext'
import {
  createBandSchema,
  type CreateBandFormData,
} from '../schemas/bandSchema'

const CreateBandPage = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [genresInput, setGenresInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateBandFormData>({
    resolver: zodResolver(createBandSchema),
    defaultValues: {
      name: '',
      description: '',
      genres: [],
    },
  })

  const onSubmit = async (data: CreateBandFormData) => {
    if (!token) {
      setApiError('You are not authenticated')
      return
    }

    const genres = genresInput
      .split(',')
      .map((genre) => genre.trim())
      .filter((genre) => genre.length > 0)

    try {
      setApiError('')

      await createBand(token, {
        ...data,
        genres,
      })
      navigate('/bands')
    } catch {
      setApiError('Failed to create band')
    }
  }

  return (
    <>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold">
            Create Band
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Band name
              </label>

              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              {errors.name && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={5}
                {...register('description')}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              {errors.description && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="genres"
                className="mb-2 block text-sm font-medium"
              >
                Genres
              </label>

              <input
                id="genres"
                type="text"
                value={genresInput}
                onChange={(event) => setGenresInput(event.target.value)}
                placeholder="Rock, Funk, Soul"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              <p className="mt-2 text-sm text-slate-400">
                Separate genres with commas.
              </p>
            </div>

            {apiError && (
              <p className="text-sm text-red-400">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Band'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default CreateBandPage