import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { getSongsByBandId } from '../api/songsApi'
import type { Song } from '../types/SongTypes'
import { useAuth } from '../context/AuthContext'
import {RehearsalSongStatus} from "../types/RehearsalSongTypes";
import {createRehearsalSong} from "../api/rehearsalSongsApi";

const AddRehearsalSongPage = () => {
  const { bandId, rehearsalId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [apiError, setApiError] = useState('')
  const [selectedSongId, setSelectedSongId] = useState('')
  const [status, setStatus] =
    useState<RehearsalSongStatus>('NEEDS_WORK')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadSongs = async () => {
      if (!token || !bandId) {
        setIsLoading(false)
        setError('Band not found')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await getSongsByBandId(token, bandId)

        setSongs(data)
      } catch {
        setError('Failed to load songs')
      } finally {
        setIsLoading(false)
      }
    }

    void loadSongs()
  }, [token, bandId])

  const handleSubmit = async () => {
    if (!token || !rehearsalId || !selectedSongId) {
      setApiError('Please select a song')
      return
    }

    try {
      setApiError('')
      setIsSubmitting(true)

      await createRehearsalSong(token, {
        rehearsalId,
        songId: selectedSongId,
        rehearsalSongStatus: status,
        notes,
      })

      navigate(`/bands/${bandId}`)
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message)
      } else {
        setApiError('Failed to add song to rehearsal')
      }
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
            Add Song to Rehearsal
          </h1>

          {isLoading && (
            <p className="mt-6 text-slate-400">
              Loading songs...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-400">
              {error}
            </p>
          )}

          {apiError && (
            <p className="mt-6 text-red-400">
              {apiError}
            </p>
          )}

          {!isLoading && !error && (
            <div className="mt-8 space-y-3">
              {songs.length > 0 && (
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
                      <option value="PLAYED">Played</option>
                      <option value="READY">Ready</option>
                      <option value="NEEDS_WORK">Needs Work</option>
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
                    disabled={!selectedSongId || isSubmitting}
                    className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Song'}
                  </button>
                </div>
              )}

              {songs.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => setSelectedSongId(song.id)}
                  className={`w-full rounded-xl border p-4 text-left ${
                    selectedSongId === song.id
                      ? 'border-violet-500 bg-violet-950/30'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <p className="font-semibold">
                    {song.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {song.artist}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default AddRehearsalSongPage