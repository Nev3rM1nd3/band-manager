export type BandRole = 'OWNER' | 'MEMBER'

export type BandMember = {
  id: string
  firstname: string
  lastname: string
  position: string
  instruments: string[]
  bandRole: BandRole
  bandId: string
  bandName: string
  userId: string | null
  userEmail: string | null
  createdAt: string
  updatedAt: string
}

export type CreateBandMemberData = {
  firstname: string
  lastname: string
  position: string
  instruments: string[]
  bandRole: BandRole
  bandId: string
  userId: string | null
}

export type UpdateBandMemberData = {
  firstname: string
  lastname: string
  position: string
  instruments: string[]
  bandRole: BandRole
}