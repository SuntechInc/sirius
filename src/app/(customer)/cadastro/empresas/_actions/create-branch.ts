'use server'

import { pipe } from 'effect'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { ApiClient } from '@/lib/effect/api-client'
import { createServerAction } from '@/lib/effect/server-action'
import { CompanyStatus } from '@/types/enums'

const createBranchSchema = z.object({
  taxId: z.string(),
  name: z.string(),
  code: z.string(),
  email: z.string().email(),
  phone: z.string(),
  responsible: z.string(),
  isHeadquarter: z.boolean().default(false),
  status: z.nativeEnum(CompanyStatus),
  addressId: z.string(),
})

const createBranch = createServerAction(createBranchSchema, input => {
  const apiClient = new ApiClient()

  return pipe(apiClient.post('/branches', input, z.any()))
})

export const createBranchAction = async (
  input: z.infer<typeof createBranchSchema>
) => {
  const result = await createBranch(input)

  if (!result.success) {
    return result
  }

  revalidatePath('/cadastro/empresas')
}
