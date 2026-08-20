import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from 'react-router'
import { createRehearsal } from '../api/rehearsalsApi'
import { useAuth } from '../context/AuthContext'
import {
  createRehearsalSchema,
  type CreateRehearsalFormData,
} from '../schemas/rehearsalSchema'

const CreateRehearsalPage = () => {
  const { bandId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateRehearsalFormData>({
    resolver: zodResolver(createRehearsalSchema),
    defaultValues: {
      startDate: '',
      startTime: '',
      endDate: null,
      endTime: null,
      location: '',
      notes: '',
    },
  })

  const onSubmit = async (data: CreateRehearsalFormData) => {
    if (!token || !bandId) {
      setApiError('Band not found')
      return
    }

    try {
      setApiError('')

      await createRehearsal(token, {
        startsAt: new Date(
          `${data.startDate}T${data.startTime}`,
        ).toISOString(),

        endsAt:
          !data.endDate || !data.endTime
            ? null
            : new Date(
              `${data.endDate}T${data.endTime}`,
            ).toISOString(),

        location: data.location,
        notes: data.notes,
        bandId,
      })

      navigate(`/bands/${bandId}`)
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message)
      } else {
        setApiError('Failed to create rehearsal')
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
            Create Rehearsal
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
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium"
              >
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                {...register('startDate')}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              {errors.startDate && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="mb-2 block text-sm font-medium"
              >
                Start Time
              </label>

              <input
                id="startTime"
                type="text"
                placeholder="18:00"
                {...register('startTime')}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              {errors.startTime && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium"
              >
                End Date
              </label>

              <input
                id="endDate"
                type="date"
                {...register('endDate', {
                  setValueAs: (value) =>
                    value === '' ? null : value,
                })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="mb-2 block text-sm font-medium"
              >
                End Time
              </label>

              <input
                id="endTime"
                type="text"
                placeholder="20:00"
                {...register('endTime', {
                  setValueAs: (value) =>
                    value === '' ? null : value,
                })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              {errors.endTime && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.endTime.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                {...register('location')}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
              />

              {errors.location && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.location.message}
                </p>
              )}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Rehearsal'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default CreateRehearsalPage