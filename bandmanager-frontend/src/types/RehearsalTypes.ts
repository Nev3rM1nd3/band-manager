export type Rehearsal = {
  id: string
  startsAt: string
  endsAt: string | null
  location: string
  notes: string | null
  bandId: string
  bandName: string
  createdAt: string
  updatedAt: string
}

export type CreateRehearsalData = {
  startsAt: string
  endsAt: string | null
  location: string
  notes: string
  bandId: string
}

export type UpdateRehearsalData = {
  startsAt: string
  endsAt: string | null
  location: string
  notes: string
}