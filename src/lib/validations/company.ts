import { z } from 'zod'
import { Industry, Segment } from '@/types/enums'

export const createCompanySchema = z.object({
  tradingName: z
    .string()
    .min(2, 'Nome fantasia deve ter pelo menos 2 caracteres'),
  legalName: z.string().min(2, 'Razão social deve ter pelo menos 2 caracteres'),
  taxId: z
    .string()
    .min(14, 'CNPJ deve ter 14 dígitos')
    .max(18, 'CNPJ muito longo'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  industry: z.nativeEnum(Industry, {
    errorMap: () => ({ message: 'Indústria é obrigatória' }),
  }),
  segment: z.nativeEnum(Segment, {
    errorMap: () => ({ message: 'Segmento é obrigatório' }),
  }),
  isActive: z.boolean().default(true),
})

export type CreateCompanyData = z.infer<typeof createCompanySchema>
