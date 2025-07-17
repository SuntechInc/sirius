import { z } from 'zod'

export const branchSchema = z.any()

export type Branch = z.infer<typeof branchSchema>
