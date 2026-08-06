import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getBands } from '../api/bandsApi'
import { useAuth } from '../context/AuthContext'
import type { Band } from '../types/BandTypes'

const BandsPage = () => {
  const {token} = useAuth()

  const [bands, setBands] = useState<Band[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadBands = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await getBands(token)

        setBands(data)
      } catch {
        setError('Failed to load bands')
      } finally {
        setIsLoading(false)
      }
    }

    void loadBands()
  }, [token])

  return (
    <>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">
            My Bands
          </h1>

          <Link
            to="/bands/new"
            className="mt-6 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500"
          >
            Create Band
          </Link>

          {isLoading && (
            <p className="mt-6 text-slate-400">
              Loading bands...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-400">
              {error}
            </p>
          )}

          {!isLoading && !error && bands.length === 0 && (
            <p className="mt-6 text-slate-400">
              You are not a member of any bands yet.
            </p>
          )}

          {!isLoading && !error && bands.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bands.map((band) => (
                <Link
                  key={band.id}
                  to={`/bands/${band.id}`}
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-violet-500 hover:bg-slate-800"
                >
                  <h2 className="text-xl font-semibold">
                    {band.name}
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    {band.description || 'No description available.'}
                  </p>

                  {band.genres.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {band.genres.map((genre) => (
                        <span
                          key={genre}
                          className="rounded-full bg-violet-600/20 px-3 py-1 text-xs text-violet-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default BandsPage