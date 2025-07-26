import { useTransition } from 'react'
import { toast } from 'sonner'
import type { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createBranchAction } from '../_actions/create-branch'
import { useNewCompany } from '../_hooks/use-new-company'
import { createBranchSchema } from '../_validations/create-branch-schema'
import { CompanyForm } from './company-form'

const formSchema = createBranchSchema.omit({
  companyId: true,
  status: true,
  addressId: true,
})

type FormValues = z.input<typeof formSchema>

export function NewCompanyDialog() {
  const [isPending, startTransition] = useTransition()
  const { isOpen, onClose } = useNewCompany()

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = await createBranchAction({
        ...values,
        isHeadquarter: values.isHeadquarter || false,
      })

      if (!result.success) {
        toast.error(result.error)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova empresa</DialogTitle>
          <DialogDescription>Gerencie uma nova empresa.</DialogDescription>
        </DialogHeader>
        <CompanyForm
          onSubmit={onSubmit}
          disabled={isPending}
          defaultValues={{
            name: '',
            email: '',
            phone: '',
            code: '',
            responsible: '',
            taxId: '',
            isHeadquarter: false,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
