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
import { useDisableBranch } from "../hooks/use-disable-branch";
import { useGetBranchById } from "../hooks/use-get-branch-by-id";
import { useAuth } from "@/hooks/use-auth";

const formSchema = createBranchSchema.omit({
  companyId: true,
});

type FormValues = z.input<typeof formSchema>;

export function EditBranchDialog() {
  const { isOpen, onClose, id } = useOpenBranch();

  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a desativar essa empresa.",
  );

  const { user } = useAuth();
  const branchQuery = useGetBranchById(user?.companyId, id);
  const disableBranchMutation = useDisableBranch(id);

  const isPending = disableBranchMutation.isPending;
  const isLoading = branchQuery.isLoading;

  function onSubmit(values: FormValues) {
    alert("TODO: Feature de editar empresa");
  }

  async function onDelete() {
    const ok = await confirm();

    if (ok) {
      disableBranchMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  const branchData = branchQuery.data?.data[0];

  const defaultValues = branchData
    ? {
        tradingName: branchData.tradingName,
        legalName: branchData.legalName,
        code: branchData.code,
        email: branchData.email,
        phone: branchData.phone,
        responsible: branchData.responsible,
        taxId: branchData.taxId,
        isHeadquarter: branchData.isHeadquarter,
        status: branchData.status,
      }
    : {
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
            <DialogTitle>Editar empresa</DialogTitle>
            <DialogDescription>
              Edite uma empresa já existente.
            </DialogDescription>
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
