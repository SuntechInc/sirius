import { z } from 'zod'
import { CompanyStatus } from '@/types/enums'

export const createBranchSchema = z.object({
  taxId: z.string(),
  name: z.string(),
  code: z.string(),
  email: z.string().email(),
  phone: z.string(),
  responsible: z.string(),
  isHeadquarter: z.boolean().default(false),
  status: z.nativeEnum(CompanyStatus),
  companyId: z.string(),
  addressId: z.string(),
})
