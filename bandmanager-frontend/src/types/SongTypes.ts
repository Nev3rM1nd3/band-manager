export type SongStatus =
  | 'LEARNING'
  | 'NEEDS_WORK'
  | 'SHREDDING'

export type Song = {
  id: string
  title: string
  artist: string
  songStatus: SongStatus
  notes: string | null
  bpm: number | null
  songKey: string | null
  durationSeconds: number | null
  bandId: string
  bandName: string
  createdAt: string
  updatedAt: string
}

export type CreateSongData = {
  title: string
  artist: string
  songStatus: SongStatus
  notes: string
  bpm: number | null
  songKey: string
  durationSeconds: number | null
  bandId: string
}

export type UpdateSongData = {
  title: string
  artist: string
  songStatus: SongStatus
  notes: string
  bpm: number | null
  songKey: string
  durationSeconds: number | null
}