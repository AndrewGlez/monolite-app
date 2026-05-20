import { useState, useCallback } from 'react'
import { authService } from '#/features/auth/services/auth.service'
import type { RegisterInput } from '#/lib/validators/auth'

export function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const execute = useCallback(async (data: RegisterInput) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await authService.register(data)
      setSuccess('Registro exitoso. Ahora podés iniciar sesión.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }, [])

  return { execute, loading, error, success }
}
