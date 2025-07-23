import { z } from 'zod'

// Schema para módulo disponível
export const moduleSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Schema para módulo da empresa
export const companyModuleSchema = z.object({
  companyId: z.string(),
  moduleId: z.string(),
  moduleCode: z.string(),
  moduleName: z.string(),
  segment: z.string(),
  status: z.string(),
  enabledAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Module = z.infer<typeof moduleSchema>
export type CompanyModule = z.infer<typeof companyModuleSchema> 