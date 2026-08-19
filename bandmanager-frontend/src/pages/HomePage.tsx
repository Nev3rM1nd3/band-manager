import { useEffect, useState } from 'react'
import { getBands } from '../api/bandsApi'
import { getUpcomingRehearsalsByBandId } from '../api/rehearsalsApi'
import { useAuth } from '../context/AuthContext'
import type { Rehearsal } from '../types/RehearsalTypes'
import {Link} from "react-router";

const HomePage = () => {

  const { token } = useAuth()

  const [upcomingRehearsals, setUpcomingRehearsals] = useState<Rehearsal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUpcomingRehearsals = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const bands = await getBands(token)

        const rehearsalsByBand = await Promise.all(
          bands.map((band) =>
            getUpcomingRehearsalsByBandId(token, band.id),
          ),
        )

        const allUpcomingRehearsals = rehearsalsByBand
          .flat()
          .sort(
            (a, b) =>
              new Date(a.startsAt).getTime() -
              new Date(b.startsAt).getTime(),
          )

        setUpcomingRehearsals(allUpcomingRehearsals)
      } catch {
        setError('Failed to load upcoming rehearsals')
      } finally {
        setIsLoading(false)
      }
    }

    void loadUpcomingRehearsals()
  }, [token])

  return (
    <>
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 text-white">
        <h1 className="text-4xl font-bold">
          Band Manager
        </h1>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">
            Upcoming Rehearsals
          </h2>

          {isLoading && (
            <p className="mt-4 text-slate-400">
              Loading upcoming rehearsals...
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {!isLoading && !error && upcomingRehearsals.length === 0 && (
            <p className="mt-4 text-slate-400">
              No upcoming rehearsals.
            </p>
          )}

          {!isLoading && !error && upcomingRehearsals.length > 0 && (
            <div className="mt-6 space-y-4">
              {upcomingRehearsals.map((rehearsal) => (
                <article
                  key={rehearsal.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {rehearsal.bandName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-300">
                        {new Date(rehearsal.startsAt).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </p>
                    </div>

                    <Link
                      to={`/bands/${rehearsal.bandId}`}
                      className="text-sm text-violet-300 hover:text-violet-200"
                    >
                      View Band
                    </Link>
                  </div>

                  <p className="mt-3 text-sm text-slate-300">
                    Location: {rehearsal.location}
                  </p>

                  {rehearsal.notes && (
                    <p className="mt-3 text-sm text-slate-400">
                      {rehearsal.notes}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default HomePage