import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewCompany } from "../-hooks/use-new-company";
import { useCreateCompany } from "../-hooks/use-create-company";
import { CompanyForm } from "./company-form";
import { BranchStatus } from "@/types/enum";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { createBranchSchema } from "../-validations/company";
import type z from "zod";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = createBranchSchema.omit({
  companyId: true,
});

export function NewCompanyDialog() {
  const { isOpen, onClose } = useNewCompany();

  const { user } = useAuth();
  const mutation = useCreateCompany();
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user?.companyId) {
      mutation.mutate(
        {
          ...values,
          companyId: user.companyId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["companies"],
            });
            onClose();
          },
          onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
          },
        },
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova conta</DialogTitle>
          <DialogDescription>
            Crie uma nova conta para rastrear suas transações.
          </DialogDescription>
        </DialogHeader>
        <CompanyForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            tradingName: "",
            legalName: "",
            code: "",
            email: "",
            phone: "",
            responsible: "",
            taxId: "",
            isHeadquarter: false,
            status: BranchStatus.ACTIVE,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
