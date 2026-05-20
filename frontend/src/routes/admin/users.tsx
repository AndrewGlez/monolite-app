import { createFileRoute, Link } from '@tanstack/react-router'
import { AuthGuard } from '#/features/auth'
import { AdminGuard } from '#/features/users/components/AdminGuard'
import { UserList } from '#/features/users/components/UserList'

export const Route = createFileRoute('/admin/users')({
  component: UserListPage,
})

function UserListPage() {
  return (
    <AuthGuard>
      <AdminGuard>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Gestión de Usuarios
            </Link>
            <Link
              to="/profile"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Mi Perfil
            </Link>
          </nav>
          <main className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Usuarios</h1>
            <UserList />
          </main>
        </div>
      </AdminGuard>
    </AuthGuard>
  )
}
