import { useState, useEffect, useCallback } from 'react'
import { userService } from '#/features/users/services/user.service'
import type { ListUsersParams } from '#/features/users/services/user.service'
import type { UserResponse } from '#/shared/types/api'

interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function useUsers() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchUsers = useCallback(
    async (params: ListUsersParams) => {
      setLoading(true)
      setError(null)
      try {
        const data = await userService.listUsers(params)
        setUsers(data.users)
        setPagination({
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
        })
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar usuarios',
        )
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchUsers({ page: pagination.page, limit: pagination.limit, search: search || undefined })
  }, [search, pagination.page, pagination.limit, fetchUsers])

  const goToPage = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
    },
    [],
  )

  const setSearchTerm = useCallback(
    (term: string) => {
      setSearch(term)
      setPagination((prev) => ({ ...prev, page: 1 }))
    },
    [],
  )

  return {
    users,
    loading,
    error,
    search,
    setSearch: setSearchTerm,
    pagination,
    goToPage,
  }
}
