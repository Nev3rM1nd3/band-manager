export type Band = {
  id: string
  name: string
  description: string | null
  genres: string[]
  createdAt: string
  updatedAt: string
}

export type CreateBandData = {
  name: string
  description: string
  genres: string[]
}