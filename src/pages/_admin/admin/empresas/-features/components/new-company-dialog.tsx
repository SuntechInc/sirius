import { useNewCompany } from "@/pages/_admin/admin/empresas/-features/store/use-new-company";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyForm } from "@/pages/_admin/admin/empresas/-features/components/company-form";
import type { createCompanySchema } from "../validations/company";
import { CompanyStatus, Industry, Segment } from "@/types/enum";
import { useCreateCompany } from "../mutations/use-create-company";
import type z from "zod";

export function NewCompanyDialog() {
  const { isOpen, onClose } = useNewCompany();

  const mutation = useCreateCompany();

  function onSubmit(values: z.input<typeof createCompanySchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nova Empresa</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova empresa.
          </DialogDescription>
        </DialogHeader>
        <CompanyForm
          onSubmit={onSubmit}
          defaultValues={{
            tradingName: "",
            legalName: "",
            email: "",
            taxId: "",
            status: CompanyStatus.ACTIVE,
            phone: "",
            industry: Industry.AGRIBUSINESS,
            segment: Segment.ANIMAL_HEALTH,
            taxCountry: "",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
