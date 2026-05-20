import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { api } from '#/lib/api/client'
import { useLocalStorage } from '#/shared/hooks/useLocalStorage'
import type {
  AuthResponse,
  UserResponse,
  MessageResponse,
} from '#/shared/types/api'

interface AuthState {
  user: UserResponse | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage<string | null>('token', null)
  const [user, setUser] = useState<UserResponse | null>(null)

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      })
      setToken(res.token)
      setUser(res.user)
    },
    [setToken],
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await api.post<MessageResponse>('/auth/register', {
        name,
        email,
        password,
      })
    },
    [],
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [setToken])

  const value: AuthState = {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
