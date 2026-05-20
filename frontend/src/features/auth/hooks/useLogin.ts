import { useState, useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '#/contexts/AuthContext'
import type { LoginInput } from '#/lib/validators/auth'

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (data: LoginInput) => {
      setLoading(true)
      setError(null)
      try {
        await login(data.email, data.password)
        navigate({ to: '/profile' })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
      } finally {
        setLoading(false)
      }
    },
    [login, navigate],
  )

  return { execute, loading, error }
}
