import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import type { createCompanySchema } from "../validations/company";
import { useOpenCompany } from "../store/use-open-company";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompaniesQueryOptions } from "../queries/get-companies";
import { useDisableCompany } from "../mutations/use-disable-company";
import { useEditCompany } from "../mutations/use-edit-company";
import { CompanyStatus } from "@/types/enum";

type FormValues = z.input<typeof createCompanySchema>;

export function EditCompanyDialog() {
  const { isOpen, onClose, id } = useOpenCompany();

  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a desativar essa empresa.",
  );

  const branchQuery = useQuery(
    getCompaniesQueryOptions(
      {
        "or.id": `eq:${id}`,
      },
      {
        select: (data) => data.data[0],
      },
    ),
  );
  const disableCompanyMutation = useDisableCompany();
  const editCompanyMutation = useEditCompany();

  const isPending = disableCompanyMutation.isPending;
  const isLoading = branchQuery.isLoading;

  const queryClient = useQueryClient();

  function onSubmit(values: FormValues) {
    if (id) {
      editCompanyMutation.mutate(
        {
          companyId: id,
          data: values,
        },
        {
          onSuccess: () => {
            onClose();
            queryClient.invalidateQueries({
              queryKey: [
                getCompaniesQueryOptions().queryKey,
                {
                  "or.id": `eq:${id}`,
                },
              ],
            });
          },
        },
      );
    }
  }

  async function onDelete() {
    const ok = await confirm();

    if (ok && id) {
      disableCompanyMutation.mutate(id, {
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
        status: CompanyStatus.ACTIVE,
      };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
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
            <CompanyForm
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
