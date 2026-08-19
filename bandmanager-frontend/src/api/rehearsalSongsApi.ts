import type {
  CreateRehearsalSongData,
  RehearsalSong,
  UpdateRehearsalSongData,
} from '../types/RehearsalSongTypes'

const API_URL = 'http://localhost:8080/api'

export const getRehearsalSongsByRehearsalId = async (
  token: string,
  rehearsalId: string,
): Promise<RehearsalSong[]> => {
  const response = await fetch(
    `${API_URL}/rehearsal-songs/rehearsal/${rehearsalId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch rehearsal songs')
  }

  return response.json()
}

export const getRehearsalSongById = async (
  token: string,
  rehearsalSongId: string,
): Promise<RehearsalSong> => {
  const response = await fetch(
    `${API_URL}/rehearsal-songs/${rehearsalSongId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch rehearsal song')
  }

  return response.json()
}

export const createRehearsalSong = async (
  token: string,
  rehearsalSongData: CreateRehearsalSongData,
): Promise<RehearsalSong> => {
  const response = await fetch(
    `${API_URL}/rehearsal-songs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rehearsalSongData),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to add song to rehearsal')
  }

  return response.json()
}

export const updateRehearsalSong = async (
  token: string,
  rehearsalSongId: string,
  rehearsalSongData: UpdateRehearsalSongData,
): Promise<RehearsalSong> => {
  const response = await fetch(
    `${API_URL}/rehearsal-songs/${rehearsalSongId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rehearsalSongData),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to update rehearsal song')
  }

  return response.json()
}

export const deleteRehearsalSong = async (
  token: string,
  rehearsalSongId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_URL}/rehearsal-songs/${rehearsalSongId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to remove song from rehearsal')
  }
}