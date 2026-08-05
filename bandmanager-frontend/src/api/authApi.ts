import type { LoginFormData } from '../schemas/authSchema'

type AuthResponse = {
  token: string
}

const API_BASE_URL = 'http://localhost:8080/api'

export const loginUser = async (
  credentials: LoginFormData,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid email or password')
  }

  return response.json()
}