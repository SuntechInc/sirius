import type { UserType } from './enums'

export interface User {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface TokenPayload {
  sub: string
  email: string
  companyId: string
  actionCompanyId: string
  userType: UserType
  iat: number
  exp: number
}
