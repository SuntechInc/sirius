import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewBranch } from "../store/use-new-branch";
import { useCreateBranch } from "../mutations/use-create-branch";
import { BranchForm } from "./branch-form";
import { BranchStatus } from "@/types/enum";
import { createBranchSchema } from "../validations/branch";
import type z from "zod";

export function NewBranchDialog() {
  const { isOpen, onClose } = useNewBranch();

  const mutation = useCreateBranch();

  function onSubmit(values: z.infer<typeof createBranchSchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova empresa</DialogTitle>
          <DialogDescription>
            Crie e gerencie uma nova empresa.
          </DialogDescription>
        </DialogHeader>
        <BranchForm
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
