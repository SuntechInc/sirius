import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { cn, getBranchStatus } from "@/lib/utils";
import { BranchStatus } from "@/types/enum";
import { Badge } from "@/components/ui/badge";
import type { Branch } from "@/types/branch";
import { Actions } from "./table-actions";

export const tableColumns: ColumnDef<Branch>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "tradingName",
    header: "Nome Fantasia",
  },
  {
    accessorKey: "legalName",
    header: "Razão Social",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "responsible",
    header: "Responsável",
  },
  {
    accessorKey: "isHeadquarter",
    header: "Matriz",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as BranchStatus;
      let className = "";
      switch (status) {
        case BranchStatus.ACTIVE:
          className = "bg-green-100 text-green-800 border-green-200";
          break;
        case BranchStatus.INACTIVE:
          className = "bg-gray-100 text-gray-800 border-gray-200";
          break;
        case BranchStatus.OBSOLETE:
          className = "bg-gray-100 text-gray-800 border-gray-200";
          break;
        case BranchStatus.SUSPENDED:
          className = "bg-yellow-100 text-yellow-800 border-yellow-200";
          break;
      }
      return <Badge className={cn(className)}>{getBranchStatus(status)}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
