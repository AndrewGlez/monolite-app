export interface UserResponse {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: UserResponse
}

export interface MessageResponse {
  message: string
  user: UserResponse
}

export interface PaginatedUsersResponse {
  users: UserResponse[]
  total: number
  page: number
  limit: number
  totalPages: number
}
