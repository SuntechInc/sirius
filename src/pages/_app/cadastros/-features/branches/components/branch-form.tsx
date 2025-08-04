import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBranchSchema } from "../validations/branch";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BranchStatus } from "@/types/enum";
import type z from "zod";

type Props = {
  id?: string;
  defaultValues?: z.infer<typeof createBranchSchema>;
  onSubmit: (values: z.infer<typeof createBranchSchema>) => void;
  disabled?: boolean;
};

export function BranchForm({
  id,
  onSubmit,
  defaultValues,
  disabled = false,
}: Props) {
  const form = useForm<z.infer<typeof createBranchSchema>>({
    resolver: zodResolver(createBranchSchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof createBranchSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          name="tradingName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Fantasia</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Acme" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="legalName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão Social</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Acme LTDA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="taxId"
          control={form.control}
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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="email@exemplo.com.br"
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
                  placeholder="+55 (00) 00000-0000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="BR001" {...field} />
              </FormControl>
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
                  placeholder="Responsável dessa empresa"
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
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status da empresa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={BranchStatus.ACTIVE}>Ativa</SelectItem>
                    <SelectItem value={BranchStatus.INACTIVE}>
                      Inativa
                    </SelectItem>
                    <SelectItem value={BranchStatus.OBSOLETE}>
                      Obsoleta
                    </SelectItem>
                    <SelectItem value={BranchStatus.SUSPENDED}>
                      Suspensa
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="isHeadquarter"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Matriz:</FormLabel>
                <FormDescription>
                  Escolha se essa empresa é uma matriz ou não.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-2" disabled={disabled}>
          {id ? "Salvar mudanças" : "Criar empresa"}
        </Button>
      </form>
    </Form>
  );
}
