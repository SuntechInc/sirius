'use server'

import { pipe } from 'effect'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { ApiClient } from '@/lib/effect/api-client'
import { createServerAction } from '@/lib/effect/server-action'
import { getCachedUser } from '@/lib/session'
import { CompanyStatus } from '@/types/enums'
import { createBranchSchema } from '../_validations/create-branch-schema'

const createBranch = createServerAction(createBranchSchema, input => {
  const apiClient = new ApiClient()

  return pipe(apiClient.post('/branches', input, z.any()))
})

const formSchema = createBranchSchema.omit({
  companyId: true,
  status: true,
  addressId: true,
})

export const createBranchAction = async (input: z.infer<typeof formSchema>) => {
  const { companyId } = await getCachedUser()

  const result = await createBranch({
    ...input,
    companyId,
    status: CompanyStatus.ACTIVE,
    addressId: 'sahsadsdsf',
  })

  if (!result.success) {
    return result
  }

  revalidatePath('/cadastro/empresas')
  return result
}
