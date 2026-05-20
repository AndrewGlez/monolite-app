import { useState, useCallback } from 'react'
import type { FormEvent } from 'react'
import { registerSchema } from '#/lib/validators/auth'
import type { RegisterInput } from '#/lib/validators/auth'
import { Input } from '#/shared/components/Input'
import { Button } from '#/shared/components/Button'
import { Alert } from '#/shared/components/Alert'
import { useRegister } from '#/features/auth/hooks/useRegister'

export function RegisterForm() {
  const { execute, loading, error, success } = useRegister()
  const [formData, setFormData] = useState<RegisterInput>({ name: '', email: '', password: '' })
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    const result = registerSchema.safeParse(formData)
    if (!result.success) {
      setValidationError(result.error.issues[0].message)
      return
    }
    await execute(result.data)
  }, [formData, execute])

  const displayError = error || validationError

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {displayError && <Alert type="error" message={displayError} />}
      {success && <Alert type="success" message={success} />}
      <Input
        label="Nombre"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        required
      />
      <Button type="submit" variant="primary" loading={loading} className="w-full">
        Registrarse
      </Button>
    </form>
  )
}
