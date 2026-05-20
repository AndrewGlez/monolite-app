import { useState, useCallback } from 'react'
import type { FormEvent } from 'react'
import { loginSchema } from '#/lib/validators/auth'
import type { LoginInput } from '#/lib/validators/auth'
import { Input } from '#/shared/components/Input'
import { Button } from '#/shared/components/Button'
import { Alert } from '#/shared/components/Alert'
import { useLogin } from '#/features/auth/hooks/useLogin'

export function LoginForm() {
  const { execute, loading, error } = useLogin()
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  })
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setValidationError(null)
      const result = loginSchema.safeParse(formData)
      if (!result.success) {
        setValidationError(result.error.issues[0].message)
        return
      }
      await execute(result.data)
    },
    [formData, execute],
  )

  const displayError = error || validationError

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {displayError && <Alert type="error" message={displayError} />}
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        required
      />
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="w-full"
      >
        Iniciar Sesión
      </Button>
    </form>
  )
}
