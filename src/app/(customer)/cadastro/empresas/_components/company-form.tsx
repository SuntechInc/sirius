import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getCompanyStatus } from '@/lib/utils'
import { CompanyStatus } from '@/types/enums'

const formSchema = z.object({
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

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export function CompanyForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled = false,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function handleSubmit(values: FormValues) {
    onSubmit(values)
  }

  function handleDelete() {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Nome da empresa"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={disabled}
                  placeholder="E-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="+00 (00) 00000-0000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={CompanyStatus.ACTIVE}>
                    {getCompanyStatus(CompanyStatus.ACTIVE)}
                  </SelectItem>
                  <SelectItem value={CompanyStatus.CANCELLED}>
                    {getCompanyStatus(CompanyStatus.CANCELLED)}
                  </SelectItem>
                  <SelectItem value={CompanyStatus.CLOSED}>
                    {getCompanyStatus(CompanyStatus.CLOSED)}
                  </SelectItem>
                  <SelectItem value={CompanyStatus.INACTIVE}>
                    {getCompanyStatus(CompanyStatus.INACTIVE)}
                  </SelectItem>
                  <SelectItem value={CompanyStatus.SUSPENDED}>
                    {getCompanyStatus(CompanyStatus.SUSPENDED)}
                  </SelectItem>
                  <SelectItem value={CompanyStatus.TRIAL}>
                    {getCompanyStatus(CompanyStatus.TRIAL)}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="responsible"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Nome do responsável"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Salvar mudanças' : 'Criar empresa'}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="mr-2 size-4" />
            Excluir empresa
          </Button>
        )}
      </form>
    </Form>
  )
}
