import type {
  BandMember,
  CreateBandMemberData,
} from '../types/BandMemberTypes'

const API_BASE_URL = 'http://localhost:8080/api'

export const getBandMembers = async (
  token: string,
  bandId: string,
): Promise<BandMember[]> => {
  const response = await fetch(
    `${API_BASE_URL}/band-members/band/${bandId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to load band members')
  }

  return response.json()
}

export const createBandMember = async (
  token: string,
  memberData: CreateBandMemberData,
): Promise<BandMember> => {
  const response = await fetch(`${API_BASE_URL}/band-members`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  })

  if (!response.ok) {
    throw new Error('Failed to create band member')
  }

  return response.json()
}