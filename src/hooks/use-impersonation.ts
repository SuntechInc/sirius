'use client'

import { create } from 'zustand'
import type { Tenant } from '@/types/admin'

interface ImpersonationState {
  isImpersonating: boolean
  impersonatedTenant: Tenant | null
  startImpersonation: (tenant: Tenant) => void
  stopImpersonation: () => void
}

export const useImpersonation = create<ImpersonationState>(set => ({
  isImpersonating: false,
  impersonatedTenant: null,
  startImpersonation: (tenant: Tenant) =>
    set({
      isImpersonating: true,
      impersonatedTenant: tenant,
    }),
  stopImpersonation: () =>
    set({
      isImpersonating: false,
      impersonatedTenant: null,
    }),
}))
