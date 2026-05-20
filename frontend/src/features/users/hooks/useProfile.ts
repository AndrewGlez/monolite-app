import { useState, useEffect, useCallback } from 'react'
import { userService } from '#/features/users/services/user.service'
import type { UserResponse } from '#/shared/types/api'

export function useProfile() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await userService.getProfile()
      setUser(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el perfil')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return { user, loading, error, refetch: fetchProfile }
}
