import { api } from '#/lib/api/client'
import type {
  UserResponse,
  MessageResponse,
  PaginatedUsersResponse,
} from '#/shared/types/api'
import type { UpdateProfileInput } from '#/lib/validators/auth'

export interface ListUsersParams {
  page?: number
  limit?: number
  search?: string
}

export const userService = {
  getProfile: () => api.get<UserResponse>('/users/me'),
  updateProfile: (data: UpdateProfileInput) =>
    api.put<MessageResponse>('/users/me', data),
  listUsers: (params: ListUsersParams = {}) => {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.set('page', String(params.page))
    if (params.limit) searchParams.set('limit', String(params.limit))
    if (params.search) searchParams.set('search', params.search)
    const query = searchParams.toString()
    return api.get<PaginatedUsersResponse>(`/users${query ? `?${query}` : ''}`)
  },
}
