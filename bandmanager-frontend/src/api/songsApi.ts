import type {
  CreateSongData,
  Song,
  UpdateSongData,
} from '../types/SongTypes'
import {handleApiResponse} from "./apiUtils";

const API_BASE_URL = 'http://localhost:8080/api'

export const getSongsByBandId = async (
  token: string,
  bandId: string,
): Promise<Song[]> => {
  const response = await fetch(
    `${API_BASE_URL}/songs/band/${bandId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  await handleApiResponse(response)

  return response.json()
}

export const getSongById = async (
  token: string,
  songId: string,
): Promise<Song> => {
  const response = await fetch(
    `${API_BASE_URL}/songs/${songId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  await handleApiResponse(response)

  return response.json()
}

export const createSong = async (
  token: string,
  songData: CreateSongData,
): Promise<Song> => {
  const response = await fetch(`${API_BASE_URL}/songs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(songData),
  })

  await handleApiResponse(response)

  return response.json()
}

export const updateSong = async (
  token: string,
  songId: string,
  songData: UpdateSongData,
): Promise<Song> => {
  const response = await fetch(`${API_BASE_URL}/songs/${songId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(songData),
  })

  await handleApiResponse(response)

  return response.json()
}

export const deleteSong = async (
  token: string,
  songId: string,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/songs/${songId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  await handleApiResponse(response)
}

export const searchSongsByTitle = async (
  token: string,
  bandId: string,
  title: string,
): Promise<Song[]> => {
  const response = await fetch(
    `${API_BASE_URL}/songs/band/${bandId}/search?title=${encodeURIComponent(title)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  await handleApiResponse(response)

  return response.json()
}