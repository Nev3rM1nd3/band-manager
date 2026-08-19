import {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router'
import {
  deleteBand,
  getBandById,
} from '../api/bandsApi'
import {useAuth} from '../context/AuthContext'
import type {Band} from '../types/BandTypes'
import {
  deleteBandMember,
  getBandMembers,
} from '../api/bandMembersApi'
import type {BandMember} from '../types/BandMemberTypes'
import {
  deleteSong,
  getSongsByBandId,
} from '../api/songsApi'
import type {Song} from "../types/SongTypes";
import {Rehearsal} from "../types/RehearsalTypes";
import {
  deleteRehearsal,
  getRehearsalsByBandId,
} from '../api/rehearsalsApi'

const BandDetailsPage = () => {
  const {bandId} = useParams()
  const {token} = useAuth()
  const navigate = useNavigate()

  const [band, setBand] = useState<Band | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [members, setMembers] = useState<BandMember[]>([])
  const [membersLoading, setMembersLoading] = useState(true)
  const [membersError, setMembersError] = useState('')
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null)
  const [isDeletingBand, setIsDeletingBand] = useState(false)
  const [songs, setSongs] = useState<Song[]>([])
  const [songsLoading, setSongsLoading] = useState(true)
  const [songsError, setSongsError] = useState('')
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null)
  const [rehearsals, setRehearsals] = useState<Rehearsal[]>([])
  const [rehearsalsLoading, setRehearsalsLoading] = useState(true)
  const [rehearsalsError, setRehearsalsError] = useState('')
  const [deletingRehearsalId, setDeletingRehearsalId] =
    useState<string | null>(null)

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
        setSongsLoading(true)
        setSongsError('')

        const data = await getBandById(token, bandId)
        const membersData = await getBandMembers(token, bandId)
        const songsData = await getSongsByBandId(token, bandId)
        const rehearsalsData = await getRehearsalsByBandId(token, bandId)

        setBand(data)
        setMembers(membersData)
        setSongs(songsData)
        setRehearsals(rehearsalsData)

      } catch {
        setError('Failed to load band')
        setMembersError('Failed to load band members')
        setSongsError('Failed to load songs')
        setRehearsalsError('Failed to load rehearsals')

      } finally {
        setIsLoading(false)
        setMembersLoading(false)
        setSongsLoading(false)
        setRehearsalsLoading(false)
      }
    }

    void loadBand()
  }, [token, bandId])

  const handleDeleteMember = async (memberId: string) => {
    if (!token) {
      setMembersError('You are not authenticated')
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this band member?',
    )

    if (!confirmed) {
      return
    }

    try {
      setMembersError('')
      setDeletingMemberId(memberId)

      await deleteBandMember(token, memberId)

      setMembers((currentMembers) =>
        currentMembers.filter((member) => member.id !== memberId),
      )
    } catch {
      setMembersError(
        'This member could not be deleted. The last owner must remain in the band.',
      )
    } finally {
      setDeletingMemberId(null)
    }
  }

  const handleDeleteBand = async () => {
    if (!token || !bandId) {
      setError('Band not found')
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this band?',
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')
      setIsDeletingBand(true)

      await deleteBand(token, bandId)

      navigate('/bands')
    } catch {
      setError('Failed to delete band')
    } finally {
      setIsDeletingBand(false)
    }
  }

  const handleDeleteSong = async (songId: string) => {
    if (!token) {
      setSongsError('You are not authenticated')
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this song?',
    )

    if (!confirmed) {
      return
    }

    try {
      setSongsError('')
      setDeletingSongId(songId)

      await deleteSong(token, songId)

      setSongs((currentSongs) =>
        currentSongs.filter((song) => song.id !== songId),
      )
    } catch {
      setSongsError('Failed to delete song')
    } finally {
      setDeletingSongId(null)
    }
  }

  const handleDeleteRehearsal = async (rehearsalId: string) => {
    if (!token) {
      setRehearsalsError('You are not authenticated')
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this rehearsal?',
    )

    if (!confirmed) {
      return
    }

    try {
      setRehearsalsError('')
      setDeletingRehearsalId(rehearsalId)

      await deleteRehearsal(token, rehearsalId)

      setRehearsals((currentRehearsals) =>
        currentRehearsals.filter(
          (rehearsal) => rehearsal.id !== rehearsalId,
        ),
      )
    } catch {
      setRehearsalsError('Failed to delete rehearsal')
    } finally {
      setDeletingRehearsalId(null)
    }
  }

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

              <Link
                to={`/bands/${bandId}/edit`}
                className="mt-6 inline-block text-sm text-violet-300 hover:text-violet-200"
              >
                Edit Band
              </Link>

              <button
                type="button"
                onClick={handleDeleteBand}
                disabled={isDeletingBand}
                className="ml-4 text-sm text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeletingBand ? 'Deleting...' : 'Delete Band'}
              </button>
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

            {!membersLoading && members.length === 0 && (
              <p className="mt-4 text-slate-400">
                No members found.
              </p>
            )}

            {!membersLoading && members.length > 0 && (
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

                        <button
                          type="button"
                          onClick={() => handleDeleteMember(member.id)}
                          disabled={deletingMemberId === member.id}
                          className="text-sm text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingMemberId === member.id ? 'Deleting...' : 'Delete'}
                        </button>
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
            {membersError && (
              <p className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
                {membersError}
              </p>
            )}
          </section>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">
              Songs
            </h2>

            <Link
              to={`/bands/${bandId}/songs/new`}
              className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500"
            >
              Add Song
            </Link>

            {songsLoading && (
              <p className="mt-4 text-slate-400">
                Loading songs...
              </p>
            )}

            {!songsLoading && songs.length === 0 && (
              <p className="mt-4 text-slate-400">
                No songs found.
              </p>
            )}

            {!songsLoading && songs.length > 0 && (
              <div className="mt-6 space-y-4">
                {songs.map((song) => (
                  <article
                    key={song.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {song.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {song.artist}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs text-violet-300">
                          {song.songStatus}
                        </span>

                        <Link
                          to={`/bands/${bandId}/songs/${song.id}/edit`}
                          className="text-sm text-violet-300 hover:text-violet-200"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteSong(song.id)}
                          disabled={deletingSongId === song.id}
                          className="text-sm text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingSongId === song.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
                      {song.bpm && (
                        <span>
                          BPM: {song.bpm}
                        </span>
                      )}

                      {song.songKey && (
                        <span>
                          Key: {song.songKey}
                        </span>
                      )}

                      {song.durationSeconds && (
                        <span>
                          Duration:{' '}
                          {Math.floor(song.durationSeconds / 60)}:
                          {String(song.durationSeconds % 60).padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {song.notes && (
                      <p className="mt-4 text-sm text-slate-400">
                        {song.notes}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {songsError && (
              <p className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
                {songsError}
              </p>
            )}
          </section>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">
              Rehearsals
            </h2>

            <Link
              to={`/bands/${bandId}/rehearsals/new`}
              className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500"
            >
              Add Rehearsal
            </Link>

            {rehearsalsLoading && (
              <p className="mt-4 text-slate-400">
                Loading rehearsals...
              </p>
            )}

            {!rehearsalsLoading && rehearsals.length === 0 && (
              <p className="mt-4 text-slate-400">
                No rehearsals found.
              </p>
            )}

            {!rehearsalsLoading && rehearsals.length > 0 && (
              <div className="mt-6 space-y-4">
                {rehearsals.map((rehearsal) => (
                  <article
                    key={rehearsal.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold">
                        {new Date(rehearsal.startsAt).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </h3>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/bands/${bandId}/rehearsals/${rehearsal.id}/edit`}
                          className="text-sm text-violet-300 hover:text-violet-200"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteRehearsal(rehearsal.id)}
                          disabled={deletingRehearsalId === rehearsal.id}
                          className="text-sm text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingRehearsalId === rehearsal.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
                    </div>

                    {rehearsal.endsAt && (
                      <p className="mt-2 text-sm text-slate-300">
                        Ends: {new Date(rehearsal.endsAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-slate-300">
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

            {rehearsalsError && (
              <p className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
                {rehearsalsError}
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  )
}

export default BandDetailsPage