import { api } from '#/lib/api/client'
import type {
  UserResponse,
  MessageResponse,
  UsersListResponse,
} from '#/shared/types/api'
import type { UpdateProfileInput } from '#/lib/validators/auth'

export const userService = {
  getProfile: () => api.get<UserResponse>('/users/me'),
  updateProfile: (data: UpdateProfileInput) =>
    api.put<MessageResponse>('/users/me', data),
  listUsers: () => api.get<UsersListResponse>('/users'),
}
