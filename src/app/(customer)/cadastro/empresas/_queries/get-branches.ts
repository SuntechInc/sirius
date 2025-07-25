import { pipe } from 'effect'
import { z } from 'zod'
import { ApiClient } from '@/lib/effect/api-client'
import { runEffect } from '@/lib/effect/utils'
import { getCachedUser } from '@/lib/session'

export async function getBranches() {
  const user = await getCachedUser()
  const apiClient = new ApiClient()

  const result = await runEffect(
    pipe(
      apiClient.get(
        `/branches/filter?companyId=${user.companyId}`,
        z.object({
          data: z.array(z.any()),
          pagination: z.object({
            hasNext: z.boolean(),
            hasPrevious: z.boolean(),
            page: z.number(),
            size: z.number(),
            total: z.number(),
            totalPages: z.number(),
          }),
          filter: z.any().optional(),
        })
      )
    )
  )

  return result
}
