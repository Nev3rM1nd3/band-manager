import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getBandById, updateBand } from '../api/bandsApi'
import { useAuth } from '../context/AuthContext'
import type { Band } from '../types/BandTypes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createBandSchema,
  type CreateBandFormData,
} from '../schemas/bandSchema'

const EditBandPage = () => {
  const { bandId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [band, setBand] = useState<Band | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [genresInput, setGenresInput] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateBandFormData>({
    resolver: zodResolver(createBandSchema),
  })

  useEffect(() => {
    const loadBand = async () => {
      if (!token || !bandId) {
        setIsLoading(false)
        setError('Band not found')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await getBandById(token, bandId)

        setBand(data)
        reset({
          name: data.name,
          description: data.description ?? '',
          genres: data.genres,
        })

        setGenresInput(data.genres.join(', '))
      } catch {
        setError('Failed to load band')
      } finally {
        setIsLoading(false)
      }
    }

    void loadBand()
  }, [token, bandId, reset])

  const onSubmit = async (data: CreateBandFormData) => {
    if (!token || !bandId) {
      setError('Band not found')
      return
    }

    const genres = genresInput
      .split(',')
      .map((genre) => genre.trim())
      .filter((genre) => genre.length > 0)

    try {
      setError('')

      await updateBand(token, bandId, {
        ...data,
        genres,
      })

      navigate(`/bands/${bandId}`)
    } catch {
      setError('Failed to update band')
    }
  }

  return (
    <>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-2xl">
          <Link
            to={bandId ? `/bands/${bandId}` : '/bands'}
            className="text-sm text-violet-300 hover:text-violet-200"
          >
            Back to band
          </Link>

          <h1 className="mt-6 text-3xl font-bold">
            Edit Band
          </h1>

          {isLoading && (
            <p className="mt-6 text-slate-400">
              Loading band...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-400">
              {error}
            </p>
          )}

          {!isLoading && !error && band && (
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  )
}

export default EditBandPage