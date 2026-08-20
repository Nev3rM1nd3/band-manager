import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from 'react-router'
import { createBandMember } from '../api/bandMembersApi'
import { useAuth } from '../context/AuthContext'
import {
  createBandMemberSchema,
  type CreateBandMemberFormData,
} from '../schemas/bandMemberSchema'

const CreateBandMemberPage = () => {
  const { bandId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [apiError, setApiError] = useState('')
  const [instrumentsInput, setInstrumentsInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateBandMemberFormData>({
    resolver: zodResolver(createBandMemberSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      position: '',
      bandRole: 'MEMBER',
    },
  })

  const onSubmit = async (data: CreateBandMemberFormData) => {
    if (!token || !bandId) {
      setApiError('Band not found')
      return
    }

    const instruments = instrumentsInput
      .split(',')
      .map((instrument) => instrument.trim())
      .filter((instrument) => instrument.length > 0)

    try {
      setApiError('')

      await createBandMember(token, {
        ...data,
        instruments,
        bandId,
        userId: null,
      })

      navigate(`/bands/${bandId}`)
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message)
      } else {
        setApiError('Failed to create band member')
      }
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
            Add Band Member
          </h1>

          {apiError && (
            <p className="mt-6 text-red-400">
              {apiError}
            </p>
          )}

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
                placeholder="Bass player, vocalist, drummer..."
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
                placeholder="Bass, Guitar, Vocals"
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

            {apiError && (
              <p className="text-sm text-red-400">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Member'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default CreateBandMemberPage