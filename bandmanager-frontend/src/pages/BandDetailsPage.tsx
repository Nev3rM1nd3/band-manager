import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getBandById } from '../api/bandsApi'
import { useAuth } from '../context/AuthContext'
import type { Band } from '../types/BandTypes'
import { getBandMembers } from '../api/bandMembersApi'
import type { BandMember } from '../types/BandMemberTypes'

const BandDetailsPage = () => {
  const { bandId } = useParams()
  const { token } = useAuth()

  const [band, setBand] = useState<Band | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [members, setMembers] = useState<BandMember[]>([])
  const [membersLoading, setMembersLoading] = useState(true)
  const [membersError, setMembersError] = useState('')

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
        setMembersLoading(true)
        setMembersError('')

        const data = await getBandById(token, bandId)
        const membersData = await getBandMembers(token, bandId)

        setBand(data)
        setMembers(membersData)
      } catch {
        setError('Failed to load band')
        setMembersError('Failed to load band members')
      } finally {
        setIsLoading(false)
        setMembersLoading(false)
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
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">
              Members
            </h2>

            <Link
              to={`/bands/${bandId}/members/new`}
              className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500"
            >
              Add Member
            </Link>

            {membersLoading && (
              <p className="mt-4 text-slate-400">
                Loading members...
              </p>
            )}

            {membersError && (
              <p className="mt-4 text-red-400">
                {membersError}
              </p>
            )}

            {!membersLoading && !membersError && members.length === 0 && (
              <p className="mt-4 text-slate-400">
                No members found.
              </p>
            )}

            {!membersLoading && !membersError && members.length > 0 && (
              <div className="mt-6 space-y-4">
                {members.map((member) => (
                  <article
                    key={member.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {member.firstname} {member.lastname}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {member.position}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs text-violet-300">
                          {member.bandRole}
                        </span>

                        <Link
                          to={`/bands/${bandId}/members/${member.id}/edit`}
                          className="text-sm text-violet-300 hover:text-violet-200"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>

                    {member.instruments.length > 0 && (
                      <p className="mt-4 text-sm text-slate-300">
                        {member.instruments.join(', ')}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}

export default BandDetailsPage