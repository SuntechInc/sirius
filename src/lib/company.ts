import { z } from 'zod'
import { CompanyStatus, Industry, Segment } from '@/types/enums'
import { apiClient } from './api'

export const companySchema = z.object({
  id: z.string(),
  email: z.string().email(),
  phone: z.string(),
  tradingName: z.string(),
  legalName: z.string(),
  segment: z.nativeEnum(Segment),
  industry: z.nativeEnum(Industry),
  status: z.nativeEnum(CompanyStatus),
  taxCountry: z.string(),
  taxId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Company = z.infer<typeof companySchema>

export const getCompanies = (params?: Record<string, any>) =>
  apiClient.get(
    '/companies/filter',
    z.object({
      data: z.array(companySchema),
      pagination: z.object({
        hasNext: z.boolean(),
        hasPrevious: z.boolean(),
        page: z.number(),
        size: z.number(),
        total: z.number(),
        totalPages: z.number(),
      }),
      filter: z.any().optional(),
    }),
    { params }
  )

export const branchSchema = z.object({
  id: z.string(),
  taxId: z.string(),
  tradingName: z.string(),
  legalName: z.string(),
  code: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  responsible: z.string().optional(),
  isHeadquarter: z.boolean().optional(),
  status: z.string().optional(),
  companyId: z.string().optional(),
  addressId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type Branch = z.infer<typeof branchSchema>

export const getBranches = (params?: Record<string, any>) =>
  apiClient.get(
    '/branches/filter',
    z.object({
      data: z.array(branchSchema),
      pagination: z.object({
        hasNext: z.boolean(),
        hasPrevious: z.boolean(),
        page: z.number(),
        size: z.number(),
        total: z.number(),
        totalPages: z.number(),
      }),
      filter: z.any().optional(),
    }),
    { params }
  )
