export interface Tenant {
  id: string
  name: string
  adminEmail: string
  status: string
  plan: string
  employeeCount: number
  createdAt: string
}

export interface SystemUser {
  id: string
  name: string
  email: string
  company: string
  accessLevel: string
  lastLogin: string
}
