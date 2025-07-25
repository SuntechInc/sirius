// Enums
export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED',
}

export interface Tenant {
  id: string
  tradingName: string
  legalName: string
  taxId: string
  taxCountry?: string
  email?: string
  industry?: string
  segment?: string
  status: CompanyStatus
  plan?: string
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
