import { api } from '#/lib/api/client'
import type { AuthResponse, MessageResponse } from '#/shared/types/api'
import type { LoginInput, RegisterInput } from '#/lib/validators/auth'

export const authService = {
  login: (data: LoginInput) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterInput) =>
    api.post<MessageResponse>('/auth/register', data),
}
