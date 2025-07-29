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
import { useDisableBranch } from "../mutations/use-disable-branch";
import { useEditBranch } from "../mutations/use-edit-branch";
import { useQuery } from "@tanstack/react-query";
import { getBranchesQueryOptions } from "../queries/get-branches";

type FormValues = z.input<typeof createBranchSchema>;

export function EditBranchDialog() {
  const { isOpen, onClose, id } = useOpenBranch();

  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a desativar essa empresa.",
  );

  const branchQuery = useQuery(
    getBranchesQueryOptions(
      {
        "or.id": `eq:${id}`,
      },
      {
        select: (data) => data.data[0],
      },
    ),
  );
  const disableBranchMutation = useDisableBranch();
  const editBranchMutation = useEditBranch();

  const isPending = disableBranchMutation.isPending;
  const isLoading = branchQuery.isLoading;

  function onSubmit(values: FormValues) {
    if (id) {
      editBranchMutation.mutate(
        {
          branchId: id,
          data: values,
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  }

  async function onDelete() {
    const ok = await confirm();

    if (ok && id) {
      disableBranchMutation.mutate(id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  const branchData = branchQuery.data;

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
