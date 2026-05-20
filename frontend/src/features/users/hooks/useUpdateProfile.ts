import { useState, useCallback } from 'react'
import { userService } from '#/features/users/services/user.service'
import type { UpdateProfileInput } from '#/lib/validators/auth'

export function useUpdateProfile(refetch: () => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const execute = useCallback(async (data: UpdateProfileInput) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await userService.updateProfile(data)
      setSuccess(true)
      refetch()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el perfil')
    } finally {
      setLoading(false)
    }
  }, [refetch])

  return { execute, loading, error, success }
}
