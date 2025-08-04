"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Actions } from "./table-options";
import type { Company } from "@/types/company";
import { CompanyStatus } from "@/types/enum";
import { Badge } from "@/components/ui/badge";
import { cn, getCompanyStatus } from "@/lib/utils";

export const tableColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "legalName",
    header: "Razão Social",
  },
  {
    accessorKey: "tradingName",
    header: "Nome Fantasia",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as CompanyStatus;
      let className = "";
      switch (status) {
        case CompanyStatus.ACTIVE:
          className = "bg-green-100 text-green-800 border-green-200";
          break;
        case CompanyStatus.INACTIVE:
          className = "bg-gray-100 text-gray-800 border-gray-200";
          break;
        case CompanyStatus.CANCELLED:
          className = "bg-gray-100 text-gray-800 border-gray-200";
          break;
        case CompanyStatus.CLOSED:
          className = "bg-yellow-100 text-yellow-800 border-yellow-200";
          break;
        case CompanyStatus.TRIAL:
          className = "bg-yellow-100 text-yellow-800 border-yellow-200";
          break;
        case CompanyStatus.SUSPENDED:
          className = "bg-yellow-100 text-yellow-800 border-yellow-200";
          break;
      }
      return (
        <Badge className={cn(className)}>{getCompanyStatus(status)}</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = new Intl.DateTimeFormat("pt-BR").format(date);
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
