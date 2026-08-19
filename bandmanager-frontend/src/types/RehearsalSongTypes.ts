export type RehearsalSongStatus =
  | 'SKIPPED'
  | 'PLAYED'
  | 'NEEDS_WORK'
  | 'READY'

export type RehearsalSong = {
  id: string
  rehearsalId: string
  rehearsalStartsAt: string
  songId: string
  songTitle: string
  songArtist: string
  rehearsalSongStatus: RehearsalSongStatus
  notes: string | null
  createdAt: string
  updatedAt: string
}

export type CreateRehearsalSongData = {
  rehearsalId: string
  songId: string
  rehearsalSongStatus: RehearsalSongStatus
  notes: string
}

export type UpdateRehearsalSongData = {
  rehearsalSongStatus: RehearsalSongStatus
  notes: string
}