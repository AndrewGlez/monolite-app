import { formatDate } from '#/shared/utils/formatDate'
import { Shield } from 'lucide-react'
import type { UserResponse } from '#/shared/types/api'

interface UserRowProps {
  user: UserResponse
  index: number
}

export function UserRow({ user, index }: UserRowProps) {
  const isEven = index % 2 === 0
  const roleBadgeClass =
    user.role === 'admin'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800'

  return (
    <tr className={`${isEven ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeClass}`}>
          {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
          {user.role === 'admin' ? 'Administrador' : 'Usuario'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {formatDate(user.createdAt)}
      </td>
    </tr>
  )
}
