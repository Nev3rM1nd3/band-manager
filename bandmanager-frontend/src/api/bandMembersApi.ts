import type {
  BandMember,
  CreateBandMemberData,
  UpdateBandMemberData,
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

export const updateBandMember = async (
  token: string,
  memberId: string,
  memberData: UpdateBandMemberData,
): Promise<BandMember> => {
  const response = await fetch(
    `${API_BASE_URL}/band-members/${memberId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to update band member')
  }

  return response.json()
}

export const getBandMemberById = async (
  token: string,
  memberId: string,
): Promise<BandMember> => {
  const response = await fetch(
    `${API_BASE_URL}/band-members/${memberId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to load band member')
  }

  return response.json()
}

export const deleteBandMember = async (
  token: string,
  memberId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/band-members/${memberId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to delete band member')
  }
}