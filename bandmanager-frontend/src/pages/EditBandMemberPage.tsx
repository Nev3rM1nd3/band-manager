import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'
import type { BandMember } from '../types/BandMemberTypes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  getBandMemberById,
  updateBandMember,
} from '../api/bandMembersApi'
import {
  createBandMemberSchema,
  type CreateBandMemberFormData,
} from '../schemas/bandMemberSchema'

const EditBandMemberPage = () => {
  const { bandId, memberId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [member, setMember] = useState<BandMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [instrumentsInput, setInstrumentsInput] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateBandMemberFormData>({
    resolver: zodResolver(createBandMemberSchema),
  })

  useEffect(() => {
    const loadMember = async () => {
      if (!token || !memberId) {
        setIsLoading(false)
        setError('Band member not found')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await getBandMemberById(token, memberId)

        setMember(data)
        reset({
          firstname: data.firstname,
          lastname: data.lastname,
          position: data.position,
          bandRole: data.bandRole,
        })

        setInstrumentsInput(data.instruments.join(', '))
      } catch {
        setError('Failed to load band member')
      } finally {
        setIsLoading(false)
      }
    }

    void loadMember()
  }, [token, memberId, reset])

  const onSubmit = async (data: CreateBandMemberFormData) => {
    if (!token || !memberId || !bandId) {
      setError('Band member not found')
      return
    }

    const instruments = instrumentsInput
      .split(',')
      .map((instrument) => instrument.trim())
      .filter((instrument) => instrument.length > 0)

    try {
      setError('')

      await updateBandMember(token, memberId, {
        ...data,
        instruments,
      })

      navigate(`/bands/${bandId}`)
    } catch {
      setError('Failed to update band member')
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
            Edit Band Member
          </h1>

          {isLoading && (
            <p className="mt-6 text-slate-400">
              Loading band member...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-400">
              {error}
            </p>
          )}

          {!isLoading && !error && member && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="firstname"
                  className="mb-2 block text-sm font-medium"
                >
                  First name
                </label>

                <input
                  id="firstname"
                  type="text"
                  {...register('firstname')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                {errors.firstname && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="mb-2 block text-sm font-medium"
                >
                  Last name
                </label>

                <input
                  id="lastname"
                  type="text"
                  {...register('lastname')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                {errors.lastname && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.lastname.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="mb-2 block text-sm font-medium"
                >
                  Position
                </label>

                <input
                  id="position"
                  type="text"
                  {...register('position')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                {errors.position && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.position.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="instruments"
                  className="mb-2 block text-sm font-medium"
                >
                  Instruments
                </label>

                <input
                  id="instruments"
                  type="text"
                  value={instrumentsInput}
                  onChange={(event) => setInstrumentsInput(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                />

                <p className="mt-2 text-sm text-slate-400">
                  Separate instruments with commas.
                </p>
              </div>

              <div>
                <label
                  htmlFor="bandRole"
                  className="mb-2 block text-sm font-medium"
                >
                  Role
                </label>

                <select
                  id="bandRole"
                  {...register('bandRole')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="MEMBER">
                    Member
                  </option>
                  <option value="OWNER">
                    Owner
                  </option>
                </select>

                {errors.bandRole && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.bandRole.message}
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

export default EditBandMemberPage