import { z } from 'zod'
import { getFormattedIndustry, getFormattedSegment } from '@/lib/utils'
import { CompanyStatus, Industry, Segment } from '@/types/enums'
import type { FormConfig } from '@/types/form-config'

// Schema para criação de empresas
export const createCompanySchema = z.object({
  tradingName: z
    .string()
    .min(2, 'Nome fantasia deve ter pelo menos 2 caracteres'),
  legalName: z.string().min(2, 'Razão social deve ter pelo menos 2 caracteres'),
  taxId: z
    .string()
    .min(14, 'CNPJ deve ter 14 dígitos')
    .max(18, 'CNPJ muito longo'),
  taxCountry: z.string().optional(),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  industry: z.nativeEnum(Industry, {
    errorMap: () => ({ message: 'Indústria é obrigatória' }),
  }),
  segment: z.nativeEnum(Segment, {
    errorMap: () => ({ message: 'Segmento é obrigatório' }),
  }),
  status: z.nativeEnum(CompanyStatus, {
    errorMap: () => ({ message: 'Status é obrigatório' }),
  }),
  addressId: z.string().optional(),
})

export type CreateCompanyData = z.infer<typeof createCompanySchema>

// Configuração para criação de empresas
export const companyCreateConfig: FormConfig<CreateCompanyData> = {
  title: 'Criar Nova Empresa',
  description: 'Preencha os dados da empresa para cadastrá-la no sistema.',
  schema: createCompanySchema,
  fields: [
    {
      name: 'tradingName',
      label: 'Nome Fantasia',
      type: 'text',
      placeholder: 'Empresa XPTO',
      gridCols: 2,
    },
    {
      name: 'legalName',
      label: 'Razão Social',
      type: 'text',
      placeholder: 'Empresa XPTO LTDA',
      gridCols: 2,
    },
    {
      name: 'taxId',
      label: 'CNPJ',
      type: 'text',
      placeholder: '00.000.000/0000-00',
      gridCols: 2,
    },
    {
      name: 'taxCountry',
      label: 'País',
      type: 'select',
      options: [
        { value: 'BR', label: 'Brasil' },
        { value: 'US', label: 'Estados Unidos' },
        { value: 'AR', label: 'Argentina' },
      ],
      gridCols: 2,
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      placeholder: 'contato@empresa.com',
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: '(11) 99999-9999',
    },
    {
      name: 'industry',
      label: 'Indústria',
      type: 'select',
      options: Object.values(Industry).map(industry => ({
        value: industry,
        label: getFormattedIndustry(industry),
      })),
      gridCols: 2,
    },
    {
      name: 'segment',
      label: 'Segmento',
      type: 'select',
      options: Object.values(Segment).map(segment => ({
        value: segment,
        label: getFormattedSegment(segment),
      })),
      gridCols: 2,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: CompanyStatus.ACTIVE, label: 'Ativa' },
        { value: CompanyStatus.INACTIVE, label: 'Inativa' },
        { value: CompanyStatus.SUSPENDED, label: 'Suspensa' },
      ],
    },
  ],
  defaultValues: {
    tradingName: '',
    legalName: '',
    taxId: '',
    taxCountry: 'BR',
    email: '',
    phone: '',
    industry: Industry.HEALTHCORE,
    segment: Segment.LABORATORY,
    status: CompanyStatus.ACTIVE,
    addressId: '',
  },
  submitLabel: 'Criar Empresa',
  submittingLabel: 'Criando...',
  successMessage: 'Empresa criada com sucesso!',
  errorMessage: 'Erro ao criar empresa. Tente novamente.',
  className: 'max-w-4xl',
}

// Schema para criação de filiais/unidades
export const createBranchSchema = z.object({
  code: z.string().min(1, 'Código é obrigatório'),
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
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  isHeadquarter: z.boolean(),
  isActive: z.boolean(),
})

export type CreateBranchData = z.infer<typeof createBranchSchema>

// Configuração para criação de filiais
export const branchCreateConfig: FormConfig<CreateBranchData> = {
  title: 'Criar Nova Filial',
  description: 'Preencha os dados da filial para cadastrá-la no sistema.',
  schema: createBranchSchema,
  fields: [
    {
      name: 'code',
      label: 'Código',
      type: 'text',
      placeholder: 'FIL001',
      gridCols: 2,
    },
    {
      name: 'tradingName',
      label: 'Nome Fantasia',
      type: 'text',
      placeholder: 'Filial XPTO',
      gridCols: 2,
    },
    {
      name: 'legalName',
      label: 'Razão Social',
      type: 'text',
      placeholder: 'Filial XPTO LTDA',
      gridCols: 2,
    },
    {
      name: 'taxId',
      label: 'CNPJ',
      type: 'text',
      placeholder: '12345678000199',
      gridCols: 2,
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      placeholder: 'contato@filial.com',
      gridCols: 2,
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: '+55 11 99999-9999',
      gridCols: 2,
    },
    {
      name: 'address',
      label: 'Endereço',
      type: 'textarea',
      placeholder: 'Rua das Flores, 123 - Centro - São Paulo/SP',
    },
    {
      name: 'isHeadquarter',
      label: 'Matriz',
      type: 'switch',
      description: 'Marque se esta filial é a matriz principal',
      tooltip: 'Apenas uma filial pode ser marcada como matriz',
    },
    {
      name: 'isActive',
      label: 'Filial Ativa',
      type: 'switch',
      description: 'Marque se a filial está ativa no sistema',
    },
  ],
  defaultValues: {
    code: '',
    tradingName: '',
    legalName: '',
    taxId: '',
    email: '',
    phone: '',
    address: '',
    isHeadquarter: false,
    isActive: true,
  },
  submitLabel: 'Criar Filial',
  submittingLabel: 'Criando...',
  successMessage: 'Filial criada com sucesso!',
  errorMessage: 'Erro ao criar filial. Tente novamente.',
  className: 'sm:max-w-[600px]',
}

// Schema para criação de departamentos
export const createDepartmentSchema = z.object({
  code: z.string().min(1, 'Código é obrigatório'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  managerId: z.string().min(1, 'Gerente é obrigatório'),
  isActive: z.boolean(),
})

export type CreateDepartmentData = z.infer<typeof createDepartmentSchema>

// Configuração para criação de departamentos
export const departmentCreateConfig: FormConfig<CreateDepartmentData> = {
  title: 'Criar Novo Departamento',
  description: 'Preencha os dados do departamento para cadastrá-lo no sistema.',
  schema: createDepartmentSchema,
  fields: [
    {
      name: 'code',
      label: 'Código',
      type: 'text',
      placeholder: 'DEP001',
      gridCols: 2,
    },
    {
      name: 'name',
      label: 'Nome do Departamento',
      type: 'text',
      placeholder: 'Recursos Humanos',
      gridCols: 2,
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      placeholder: 'Departamento responsável pela gestão de pessoas...',
    },
    {
      name: 'managerId',
      label: 'Gerente',
      type: 'select',
      options: [
        { value: '1', label: 'João Silva - Gerente' },
        { value: '2', label: 'Maria Santos - Supervisor' },
        { value: '3', label: 'Pedro Costa - Coordenador' },
      ],
      placeholder: 'Selecione o gerente',
    },
    {
      name: 'isActive',
      label: 'Departamento Ativo',
      type: 'switch',
      description: 'Marque se o departamento está ativo no sistema',
    },
  ],
  defaultValues: {
    code: '',
    name: '',
    description: '',
    managerId: '',
    isActive: true,
  },
  submitLabel: 'Criar Departamento',
  submittingLabel: 'Criando...',
  successMessage: 'Departamento criado com sucesso!',
  errorMessage: 'Erro ao criar departamento. Tente novamente.',
  className: 'sm:max-w-[600px]',
}
