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
import { CompanyStatus, Industry, Segment } from "@/types/enum";

type Props = {
  id?: string;
  defaultValues?: z.infer<typeof createCompanySchema>;
  onSubmit: (values: z.input<typeof createCompanySchema>) => void;
  disabled?: boolean;
};

export function CompanyForm({
  id,
  onSubmit,
  defaultValues,
  disabled = false,
}: Props) {
  const form = useForm<z.input<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues,
  });

  function handleSubmit(values: z.input<typeof createCompanySchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
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
          name="taxCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País do CNPJ</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="BR" {...field} />
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
                  <SelectItem value={CompanyStatus.SUSPENDED}>
                    Suspensa
                  </SelectItem>
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
                  <SelectItem value={Segment.LABORATORY}>
                    Laboratório
                  </SelectItem>
                  <SelectItem value={Segment.HOSPITAL}>Hospital</SelectItem>
                  <SelectItem value={Segment.MEDICAL_METALLURGY}>
                    Metalúrgica Médica
                  </SelectItem>
                  <SelectItem value={Segment.ANIMAL_HEALTH}>
                    Saúde Animal
                  </SelectItem>
                  <SelectItem value={Segment.VEHICLE_INSPECTION}>
                    Inspeção Veicular
                  </SelectItem>
                  <SelectItem value={Segment.VEHICLE_REGISTRATION}>
                    Registro Veicular
                  </SelectItem>
                  <SelectItem value={Segment.DRIVING_SCHOOL}>
                    Auto Escola
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
                  <SelectItem value={Industry.HEALTHCORE}>Saúde</SelectItem>
                  <SelectItem value={Industry.AGRIBUSINESS}>
                    Agronegócio
                  </SelectItem>
                  <SelectItem value={Industry.TRANSPORTATION_MOBILITY}>
                    Transporte e Mobilidade
                  </SelectItem>
                  <SelectItem value={Industry.TECHNOLOGY}>
                    Tecnologia
                  </SelectItem>
                </SelectContent>
              </Select>
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
                <Input disabled={disabled} placeholder="Telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-auto" disabled={disabled}>
          {id ? "Salvar mudanças" : "Criar empresa"}
        </Button>
      </form>
    </Form>
  );
}
