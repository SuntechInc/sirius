import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import type { createCompanySchema } from "../validations/company";
import { useOpenCompany } from "../store/use-open-company";
import { useQuery } from "@tanstack/react-query";
import { getCompaniesQueryOptions } from "../queries/get-companies";
import { useEditCompany } from "../mutations/use-edit-company";
import { CompanyStatus, Industry, Segment } from "@/types/enum";
import { CompanyForm } from "./company-form";
import { Loader2 } from "lucide-react";

type FormValues = z.input<typeof createCompanySchema>;

export function EditCompanyDialog() {
  const { isOpen, onClose, id } = useOpenCompany();

  const companyQuery = useQuery(
    getCompaniesQueryOptions(
      {
        "or.id": `eq:${id}`,
      },
      {
        select: (data) => data.data[0],
        enabled: !!id,
      },
    ),
  );
  const editCompanyMutation = useEditCompany();

  const isLoading = companyQuery.isLoading || editCompanyMutation.isPending;

  function onSubmit(values: FormValues) {
    if (id) {
      editCompanyMutation.mutate(
        {
          companyId: id,
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

  const companyData = companyQuery.data;

  const defaultValues = companyData
    ? {
        tradingName: companyData.tradingName,
        legalName: companyData.legalName,
        taxId: companyData.taxId,
        taxCountry: companyData.taxCountry,
        email: companyData.email,
        industry: companyData.industry,
        segment: companyData.segment,
        status: companyData.status,
        phone: companyData.phone,
      }
    : {
        tradingName: "",
        legalName: "",
        taxId: "",
        taxCountry: "",
        email: "",
        industry: Industry.AGRIBUSINESS,
        segment: Segment.ANIMAL_HEALTH,
        status: CompanyStatus.ACTIVE,
        phone: "",
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
          <CompanyForm
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
