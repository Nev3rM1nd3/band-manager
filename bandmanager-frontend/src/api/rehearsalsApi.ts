import type {
  CreateRehearsalData,
  Rehearsal,
  UpdateRehearsalData,
} from '../types/RehearsalTypes'

const API_URL = 'http://localhost:8080/api'

export const getRehearsalsByBandId = async (
  token: string,
  bandId: string,
): Promise<Rehearsal[]> => {
  const response = await fetch(
    `${API_URL}/rehearsals/band/${bandId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch rehearsals')
  }

  return response.json()
}

export const getRehearsalById = async (
  token: string,
  rehearsalId: string,
): Promise<Rehearsal> => {
  const response = await fetch(
    `${API_URL}/rehearsals/${rehearsalId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch rehearsal')
  }

  return response.json()
}

export const createRehearsal = async (
  token: string,
  rehearsalData: CreateRehearsalData,
): Promise<Rehearsal> => {
  const response = await fetch(`${API_URL}/rehearsals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rehearsalData),
  })

  if (!response.ok) {
    throw new Error('Failed to create rehearsal')
  }

  return response.json()
}

export const updateRehearsal = async (
  token: string,
  rehearsalId: string,
  rehearsalData: UpdateRehearsalData,
): Promise<Rehearsal> => {
  const response = await fetch(
    `${API_URL}/rehearsals/${rehearsalId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rehearsalData),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to update rehearsal')
  }

  return response.json()
}

export const deleteRehearsal = async (
  token: string,
  rehearsalId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_URL}/rehearsals/${rehearsalId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to delete rehearsal')
  }
}