import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import {
  getRehearsalSongById,
  updateRehearsalSong,
} from '../api/rehearsalSongsApi'
import type { RehearsalSongStatus } from '../types/RehearsalSongTypes'
import { useAuth } from '../context/AuthContext'

const EditRehearsalSongPage = () => {
  const { bandId, rehearsalSongId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [status, setStatus] =
    useState<RehearsalSongStatus>('NEEDS_WORK')

  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRehearsalSong = async () => {
      if (!token || !rehearsalSongId) {
        setIsLoading(false)
        setError('Rehearsal song not found')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await getRehearsalSongById(
          token,
          rehearsalSongId,
        )

        setStatus(data.rehearsalSongStatus)
        setNotes(data.notes ?? '')
      } catch {
        setError('Failed to load rehearsal song')
      } finally {
        setIsLoading(false)
      }
    }

    void loadRehearsalSong()
  }, [token, rehearsalSongId])

  const handleSubmit = async () => {
    if (!token || !rehearsalSongId || !bandId) {
      setError('Rehearsal song not found')
      return
    }

    try {
      setError('')
      setIsSubmitting(true)

      await updateRehearsalSong(token, rehearsalSongId, {
        rehearsalSongStatus: status,
        notes,
      })

      navigate(`/bands/${bandId}`)
    } catch {
      setError('Failed to update rehearsal song')
    } finally {
      setIsSubmitting(false)
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
            Edit Rehearsal Song
          </h1>

          {isLoading && (
            <p className="mt-6 text-slate-400">
              Loading rehearsal song...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-400">
              {error}
            </p>
          )}

          {!isLoading && !error && (
            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium"
                >
                  Status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as RehearsalSongStatus)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="NEEDS_WORK">Needs Work</option>
                  <option value="READY">Ready</option>
                  <option value="PLAYED">Played</option>
                  <option value="SKIPPED">Skipped</option>
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
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default EditRehearsalSongPage