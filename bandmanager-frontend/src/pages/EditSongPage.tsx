import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from 'react-router'
import {
  getSongById,
  updateSong,
} from '../api/songsApi'
import { useAuth } from '../context/AuthContext'
import {
  createSongSchema,
  type CreateSongFormData,
} from '../schemas/songSchema'

const EditSongPage = () => {
  const { bandId, songId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateSongFormData>({
    resolver: zodResolver(createSongSchema),
  })

  useEffect(() => {
    const loadSong = async () => {
      if (!token || !songId) {
        setIsLoading(false)
        setError('Song not found')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await getSongById(token, songId)

        reset({
          title: data.title,
          artist: data.artist,
          songStatus: data.songStatus,
          notes: data.notes ?? '',
          bpm: data.bpm,
          songKey: data.songKey ?? '',
          duration:
            data.durationSeconds === null
              ? null
              : `${Math.floor(data.durationSeconds / 60)}:${String(
                data.durationSeconds % 60,
              ).padStart(2, '0')}`,
        })
      } catch {
        setError('Failed to load song')
      } finally {
        setIsLoading(false)
      }
    }

    void loadSong()
  }, [token, songId, reset])

  const onSubmit = async (data: CreateSongFormData) => {
    if (!token || !songId || !bandId) {
      setError('Song not found')
      return
    }

    try {
      setError('')

      await updateSong(token, songId, {
        title: data.title,
        artist: data.artist,
        songStatus: data.songStatus,
        notes: data.notes,
        bpm: data.bpm,
        songKey: data.songKey,
        durationSeconds:
          data.duration === null
            ? null
            : (() => {
              const [minutes, seconds] = data.duration.split(':').map(Number)
              return minutes * 60 + seconds
            })(),
      })

      navigate(`/bands/${bandId}`)
    } catch {
      setError('Failed to update song')
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
            Edit Song
          </h1>

          {isLoading && (
            <p className="mt-6 text-slate-400">
              Loading song...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-400">
              {error}
            </p>
          )}

          {!isLoading && !error && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  Title
                </label>

                <input
                  id="title"
                  type="text"
                  {...register('title')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="artist"
                  className="mb-2 block text-sm font-medium"
                >
                  Artist
                </label>

                <input
                  id="artist"
                  type="text"
                  {...register('artist')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                {errors.artist && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.artist.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="songStatus"
                  className="mb-2 block text-sm font-medium"
                >
                  Status
                </label>

                <select
                  id="songStatus"
                  {...register('songStatus')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="LEARNING">Learning</option>
                  <option value="NEEDS_WORK">Needs work</option>
                  <option value="SHREDDING">Shredding</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium"
                >
                  Notes
                </label>

                <textarea
                  id="notes"
                  rows={5}
                  {...register('notes')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="bpm"
                  className="mb-2 block text-sm font-medium"
                >
                  BPM
                </label>

                <input
                  id="bpm"
                  type="number"
                  {...register('bpm', {
                    setValueAs: (value) =>
                      value === '' ? null : Number(value),
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="songKey"
                  className="mb-2 block text-sm font-medium"
                >
                  Key
                </label>

                <input
                  id="songKey"
                  type="text"
                  {...register('songKey')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-medium"
                >
                  Duration
                </label>

                <input
                  id="duration"
                  type="text"
                  placeholder="4:32"
                  {...register('duration', {
                    setValueAs: (value) =>
                      value === '' ? null : value,
                  })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                {errors.duration && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.duration.message}
                  </p>
                )}
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

export default EditSongPage