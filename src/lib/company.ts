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

export const getCompanies = apiClient.get(
  '/companies',
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
  })
)
