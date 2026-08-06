import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getBandById } from '../api/bandsApi'
import { useAuth } from '../context/AuthContext'
import type { Band } from '../types/BandTypes'

const BandDetailsPage = () => {
  const { bandId } = useParams()
  const { token } = useAuth()

  const [band, setBand] = useState<Band | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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
      } catch {
        setError('Failed to load band')
      } finally {
        setIsLoading(false)
      }
    }

    void loadBand()
  }, [token, bandId])

  return (
    <>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/bands"
            className="text-sm text-violet-300 hover:text-violet-200"
          >
            Back to bands
          </Link>

          <h1 className="mt-6 text-3xl font-bold">
            Band details
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
            <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-semibold">
                {band.name}
              </h2>

              <p className="mt-3 text-slate-400">
                {band.description || 'No description available.'}
              </p>

              {band.genres.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {band.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-violet-600/20 px-3 py-1 text-sm text-violet-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </>
  )
}

export default BandDetailsPage