# Sistema de Formulários Reutilizáveis

Este sistema permite criar modais de criação de forma consistente e reutilizável para diferentes entidades.

## Arquitetura

### Componentes Principais

1. **`CreateModal`** - Componente genérico que renderiza qualquer formulário baseado em configuração
2. **`DialogWrapper`** - Wrapper para o dialog que pode ser reutilizado
3. **Configurações de Formulário** - Objetos que definem a estrutura dos formulários

### Tipos

- `FormConfig<T>` - Configuração completa do formulário
- `FormFieldConfig` - Configuração de um campo individual
- `FieldType` - Tipos de campos suportados (text, email, tel, select, switch, textarea)

## Como Usar

### 1. Criar uma Configuração de Formulário

```typescript
import { FormConfig } from "@/types/form-config";
import { z } from "zod";

const mySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  isActive: z.boolean().default(true),
});

export const myCreateConfig: FormConfig<z.infer<typeof mySchema>> = {
  title: "Criar Nova Entidade",
  description: "Preencha os dados para criar uma nova entidade.",
  schema: mySchema,
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      placeholder: "Digite o nome",
      gridCols: 2,
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "email@exemplo.com",
      gridCols: 2,
    },
    {
      name: "isActive",
      label: "Ativo",
      type: "switch",
      description: "Marque se está ativo",
    },
  ],
  defaultValues: {
    name: "",
    email: "",
    isActive: true,
  },
  submitLabel: "Criar",
  submittingLabel: "Criando...",
  successMessage: "Entidade criada com sucesso!",
  errorMessage: "Erro ao criar entidade.",
};
```

### 2. Criar o Componente de Modal

```typescript
"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateModal } from "@/components/ui/create-modal";
import { myCreateConfig } from "@/lib/configs/form-configs";

interface MyCreateModalProps {
  trigger?: React.ReactNode;
  onSubmit: (data: MyData) => Promise<{ success: boolean; error?: string }>;
}

export function MyCreateModal({ trigger, onSubmit }: MyCreateModalProps) {
  const defaultTrigger = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Criar novo
    </Button>
  );

  return (
    <CreateModal
      config={myCreateConfig}
      onSubmit={onSubmit}
      trigger={trigger || defaultTrigger}
    />
  );
}
```

### 3. Usar na Página

```typescript
import { MyCreateModal } from "@/components/my-create-modal";

export default function MyPage() {
  return (
    <div>
      <MyCreateModal
        onSubmit={async (data) => {
          // Implementar chamada da API
          const result = await api.create(data);
          return result;
        }}
      />
    </div>
  );
}
```

## Tipos de Campos Suportados

### Text

```typescript
{
  name: 'name',
  label: 'Nome',
  type: 'text',
  placeholder: 'Digite o nome',
  gridCols: 2, // opcional
}
```

### Email

```typescript
{
  name: 'email',
  label: 'E-mail',
  type: 'email',
  placeholder: 'email@exemplo.com',
}
```

### Tel

```typescript
{
  name: 'phone',
  label: 'Telefone',
  type: 'tel',
  placeholder: '+55 11 99999-9999',
}
```

### Select

```typescript
{
  name: 'status',
  label: 'Status',
  type: 'select',
  options: [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ],
}
```

### Switch

```typescript
{
  name: 'isActive',
  label: 'Ativo',
  type: 'switch',
  description: 'Marque se está ativo no sistema',
  tooltip: 'Informação adicional sobre o campo', // opcional
}
```

### Textarea

```typescript
{
  name: 'description',
  label: 'Descrição',
  type: 'textarea',
  placeholder: 'Digite uma descrição...',
}
```

## Vantagens do Sistema

1. **Reutilização** - Mesmo componente para diferentes entidades
2. **Consistência** - Interface uniforme em toda a aplicação
3. **Manutenibilidade** - Mudanças centralizadas
4. **Flexibilidade** - Fácil adição de novos tipos de campos
5. **Type Safety** - Validação de tipos com TypeScript e Zod

## Exemplos Implementados

- `CompanyCreateModal` - Criação de empresas
- `BranchCreateModal` - Criação de filiais
- `DepartmentCreateModal` - Criação de departamentos

## Extensões Futuras

- Suporte a campos de data/hora
- Suporte a upload de arquivos
- Suporte a campos de busca com autocomplete
- Suporte a campos condicionais
- Suporte a validação customizada
