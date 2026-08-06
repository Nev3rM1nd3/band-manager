import type {
  Band,
  CreateBandData,
} from '../types/BandTypes'

const API_BASE_URL = 'http://localhost:8080/api'

export const getBands = async (
  token: string,
): Promise<Band[]> => {
  const response = await fetch(`${API_BASE_URL}/bands`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load bands')
  }

  return response.json()
}

export const createBand = async (
  token: string,
  bandData: CreateBandData,
): Promise<Band> => {
  const response = await fetch(`${API_BASE_URL}/bands`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bandData),
  })

  if (!response.ok) {
    throw new Error('Failed to create band')
  }

  return response.json()
}

export const getBandById = async (
  token: string,
  bandId: string,
): Promise<Band> => {
  const response = await fetch(`${API_BASE_URL}/bands/${bandId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load band')
  }

  return response.json()
}

export const updateBand = async (
  token: string,
  bandId: string,
  bandData: CreateBandData,
): Promise<Band> => {
  const response = await fetch(`${API_BASE_URL}/bands/${bandId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bandData),
  })

  if (!response.ok) {
    throw new Error('Failed to update band')
  }

  return response.json()
}

export const deleteBand = async (
  token: string,
  bandId: string,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/bands/${bandId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete band')
  }
}