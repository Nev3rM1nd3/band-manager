import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { getEmailFromToken } from '../utils/jwtUtils'

type AuthContextType = {
  token: string | null
  userEmail: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )

  const userEmail =
    token === null
      ? null
      : getEmailFromToken(token)

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          userEmail,
          isAuthenticated: Boolean(token),
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }