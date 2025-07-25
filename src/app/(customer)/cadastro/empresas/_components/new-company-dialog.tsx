import { useTransition } from 'react'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CompanyStatus } from '@/types/enums'
import { createBranchAction } from '../_actions/create-branch'
import { useNewCompany } from '../_hooks/use-new-company'
import { CompanyForm } from './company-form'

const formSchema = z.object({
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

type FormValues = z.input<typeof formSchema>

export function NewCompanyDialog() {
  const [isPending, startTransition] = useTransition()
  const { isOpen, onClose } = useNewCompany()

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      await createBranchAction({
        ...values,
        isHeadquarter: values.isHeadquarter || false,
      })
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
            addressId: '',
            companyId: '',
            status: CompanyStatus.ACTIVE,
            taxId: '',
            isHeadquarter: false,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
