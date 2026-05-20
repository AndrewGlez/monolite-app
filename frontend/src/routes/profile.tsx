import { createFileRoute, Link } from '@tanstack/react-router'
import { AuthGuard } from '#/features/auth'
import { ProfileCard } from '#/features/users/components/ProfileCard'
import { useAuth } from '#/contexts/AuthContext'

export const Route = createFileRoute('/profile')({ component: ProfilePage })

function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Gestión de Usuarios
          </Link>
          <div className="flex gap-4 items-center">
            {user?.role === 'admin' && (
              <Link
                to="/admin/users"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Administrar
              </Link>
            )}
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:underline"
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
        <main className="max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
          <ProfileCard />
        </main>
      </div>
    </AuthGuard>
  )
}
