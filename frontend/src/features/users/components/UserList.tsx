import { useUsers } from '#/features/users/hooks/useUsers'
import { UserRow } from '#/features/users/components/UserRow'
import { Alert } from '#/shared/components/Alert'
import { SearchInput } from '#/shared/components/SearchInput'
import { Pagination } from '#/shared/components/Pagination'

export function UserList() {
  const { users, loading, error, search, setSearch, pagination, goToPage } =
    useUsers()

  const content = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-12 bg-gray-100" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-50 border-t border-gray-100"
            />
          ))}
        </div>
      )
    }

    if (error) {
      return <Alert type="error" message={error} />
    }

    if (users.length === 0) {
      const msg = search
        ? `No se encontraron usuarios para "${search}"`
        : 'No hay usuarios'
      return (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">{msg}</p>
        </div>
      )
    }

    return (
      <>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Registro
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <UserRow key={user.id} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>
            Mostrando {users.length} de {pagination.total} usuarios
          </span>
        </div>
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      </>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre o email..."
        />
      </div>
      {content()}
    </div>
  )
}
