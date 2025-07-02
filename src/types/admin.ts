import type { UserType } from './enums'

export interface Tenant {
  id: string
  name: string
  adminEmail: string
  status: 'ativa' | 'suspensa' | 'pendente'
  plan: string
  employeeCount: number
  createdAt: string
}

export interface SystemUser {
  id: string
  name: string
  email: string
  company: string
  accessLevel: UserType
  lastLogin: string
}
