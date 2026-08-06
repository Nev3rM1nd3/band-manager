import type {
  LoginFormData,
  RegisterFormData,
} from '../schemas/authSchema'

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

export const registerUser = async (
  userData: RegisterFormData,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Registration failed')
  }

  return response.json()
}