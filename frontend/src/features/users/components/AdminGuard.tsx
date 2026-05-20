import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '#/contexts/AuthContext'

interface AdminGuardProps {
  children: ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    } else if (!isAdmin) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, isAdmin, navigate])

  if (!isAuthenticated) {
    return null
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Acceso denegado</h2>
          <p className="text-gray-600">No tenés permisos para acceder a esta sección.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
