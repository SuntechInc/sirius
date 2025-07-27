import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { createBranchSchema } from "../validations/branch";
import { useOpenBranch } from "../store/use-open-branch";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { BranchForm } from "./branch-form";
import { BranchStatus } from "@/types/enum";

const formSchema = createBranchSchema.omit({
  companyId: true,
});

type FormValues = z.input<typeof formSchema>;

export function EditBranchDialog() {
  const { isOpen, onClose, id } = useOpenBranch();

  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a excluir essa conta.",
  );

  const isPending = false;
  const isLoading = false;

  function onSubmit(values: FormValues) {
    alert("TODO: Feature de editar empresa");
  }

  async function onDelete() {
    const ok = await confirm();

    if (ok) {
      alert("TODO: Feature de excluir empresa");
    }
  }

  const defaultValues = {
    tradingName: "",
    legalName: "",
    code: "",
    email: "",
    phone: "",
    responsible: "",
    taxId: "",
    isHeadquarter: false,
    status: BranchStatus.ACTIVE,
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar conta</DialogTitle>
            <DialogDescription>Edite uma conta já existente.</DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <BranchForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
