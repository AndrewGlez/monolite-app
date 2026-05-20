import { useState } from 'react'
import { useProfile } from '#/features/users/hooks/useProfile'
import { useUpdateProfile } from '#/features/users/hooks/useUpdateProfile'
import { Card } from '#/shared/components/Card'
import { Button } from '#/shared/components/Button'
import { Input } from '#/shared/components/Input'
import { Alert } from '#/shared/components/Alert'
import { formatDate } from '#/shared/utils/formatDate'
import { User, Mail, Shield, Calendar } from 'lucide-react'

export function ProfileCard() {
  const { user, loading, error, refetch } = useProfile()
  const {
    execute: updateProfile,
    loading: saving,
    error: updateError,
    success,
  } = useUpdateProfile(refetch)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </Card>
    )
  }

  if (error) {
    return <Alert type="error" message={error} />
  }

  if (!user) {
    return <Alert type="info" message="No se encontró información del perfil" />
  }

  const handleEdit = () => {
    setName(user.name)
    setIsEditing(true)
  }

  const handleSave = async () => {
    await updateProfile({ name })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setName(user.name)
  }

  const roleBadgeClass =
    user.role === 'admin'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800'

  return (
    <Card>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${roleBadgeClass}`}
          >
            {user.role === 'admin' ? (
              <>
                <Shield className="w-3 h-3 mr-1" />
                Administrador
              </>
            ) : (
              'Usuario'
            )}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-5 h-5 text-gray-400" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span>Miembro desde {formatDate(user.createdAt)}</span>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 space-y-4">
          <Input
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
          />
          {updateError && <Alert type="error" message={updateError} />}
          {success && (
            <Alert type="success" message="Perfil actualizado correctamente" />
          )}
          <div className="flex gap-3">
            <Button onClick={handleSave} loading={saving}>
              Guardar
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <Button variant="secondary" onClick={handleEdit}>
            Editar Perfil
          </Button>
          {success && (
            <div className="mt-3">
              <Alert
                type="success"
                message="Perfil actualizado correctamente"
              />
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
