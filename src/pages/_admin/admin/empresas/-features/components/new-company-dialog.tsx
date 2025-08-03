import { useNewCompany } from "@/pages/_admin/admin/empresas/-features/store/use-new-company";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyForm } from "@/pages/_admin/admin/empresas/-features/components/company-form";

export function NewCompanyDialog() {
  const { isOpen, onClose } = useNewCompany();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nova Empresa</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova empresa.
          </DialogDescription>
        </DialogHeader>
        <CompanyForm />
      </DialogContent>
    </Dialog>
  );
}
