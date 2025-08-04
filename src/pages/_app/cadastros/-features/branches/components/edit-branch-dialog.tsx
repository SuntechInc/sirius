import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BranchStatus } from "@/types/enum";
import { useEditBranch } from "../mutations/use-edit-branch";
import { getBranchesQueryOptions } from "../queries/get-branches";
import { useOpenBranch } from "../store/use-open-branch";
import type { createBranchSchema } from "../validations/branch";
import { BranchForm } from "./branch-form";

type FormValues = z.input<typeof createBranchSchema>;

export function EditBranchDialog() {
  const { isOpen, onClose, id } = useOpenBranch();

  const branchQuery = useQuery(
    getBranchesQueryOptions(
      {
        "or.id": `eq:${id}`,
      },
      {
        select: (data) => data.data[0],
        enabled: !!id,
      },
    ),
  );
  const editBranchMutation = useEditBranch();

  const isLoading = branchQuery.isLoading || editBranchMutation.isPending;

  function onSubmit(values: FormValues) {
    if (id) {
      editBranchMutation.mutate(
        {
          branchId: id,
          data: values,
        },
        {
          onSuccess: async () => {
            onClose();
          },
        },
      );
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar empresa</DialogTitle>
          <DialogDescription>Edite uma empresa já existente.</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <BranchForm
            id={id}
            onSubmit={onSubmit}
            disabled={isLoading}
            defaultValues={defaultValues}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
