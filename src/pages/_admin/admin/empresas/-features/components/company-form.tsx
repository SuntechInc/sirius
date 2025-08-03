"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCompanySchema } from "../validations/company";
import { CompanyStatus, Segment } from "@/types/enum";

type Props = {
  id?: string;
  defaultValues?: z.infer<typeof createCompanySchema>;
  onSubmit: (values: z.infer<typeof createCompanySchema>) => void;
  disabled?: boolean;
};

export function CompanyForm({
  id,
  onSubmit,
  defaultValues,
  disabled = false,
}: Props) {
  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof createCompanySchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razão Social</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Razão Social"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tradingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Fantasia</FormLabel>
                <FormControl>
                  <Input placeholder="Nome Fantasia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="00.000.000/0000-00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={disabled}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={CompanyStatus.ACTIVE}>Ativa</SelectItem>
                    <SelectItem value={CompanyStatus.INACTIVE}>
                      Inativa
                    </SelectItem>
                    <SelectItem value={CompanyStatus.CANCELLED}>
                      Cancelada
                    </SelectItem>
                    <SelectItem value={CompanyStatus.CLOSED}>
                      Fechada
                    </SelectItem>
                    <SelectItem value={CompanyStatus.SUSPENDED}>
                      Suspensa
                    </SelectItem>
                    <SelectItem value={CompanyStatus.TRIAL}>Trial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="segment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segmento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={disabled}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Segment.HOSPITAL}>Hospital</SelectItem>
                    <SelectItem value={Segment.ANIMAL_HEALTH}>
                      Clínica
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indústria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={disabled}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a indústria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HEALTHCARE">Saúde</SelectItem>
                    <SelectItem value="TECHNOLOGY">Tecnologia</SelectItem>
                    <SelectItem value="FINANCE">Financeiro</SelectItem>
                    <SelectItem value="EDUCATION">Educação</SelectItem>
                    <SelectItem value="RETAIL">Varejo</SelectItem>
                    <SelectItem value="OTHER">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input disabled={disabled} placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Telefone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="col-span-2" disabled={disabled}>
          {id ? "Salvar mudanças" : "Criar empresa"}
        </Button>
      </form>
    </Form>
  );
}
