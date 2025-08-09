import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "../ui/input";

import { DataTableViewOptions } from "./column-toggle";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumns?: string[];
  searchPlaceholder?: string;
  columnNames?: Record<string, string>;
  enableSearch?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchableColumns,
  searchPlaceholder,
  columnNames,
  enableSearch = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _, value) => {
      if (!value) return true;

      const searchValue = value.toLowerCase();

      // Use searchableColumns if provided, otherwise search all filterable columns
      let columnsToSearch: string[] = [];

      if (searchableColumns && searchableColumns.length > 0) {
        columnsToSearch = searchableColumns;
      } else {
        // Fallback to searching in all columns that have an id or accessorKey
        columnsToSearch = columns
          .filter(col => {
            return col.id || ("accessorKey" in col && col.accessorKey);
          })
          .map(col => {
            if (col.id) return col.id;
            if ("accessorKey" in col && typeof col.accessorKey === "string") {
              return col.accessorKey;
            }
            return "";
          })
          .filter(id => id && id !== "actions");
      }

      return columnsToSearch.some(colId => {
        const cellValue = row.getValue(colId);
        return cellValue?.toString().toLowerCase().includes(searchValue);
      });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  // Generate placeholder text based on searchable columns
  const getPlaceholderText = () => {
    if (searchableColumns && searchableColumns.length > 0) {
      const translatedColumns = searchableColumns
        .map(col => columnNames?.[col] || col)
        .join(", ");
      return `Buscar por ${translatedColumns}...`;
    }
    return "Buscar...";
  };

  const defaultPlaceholder = getPlaceholderText();

  return (
    <div>
      <div className="flex items-center py-4">
        {enableSearch && (
          <Input
            placeholder={searchPlaceholder || defaultPlaceholder}
            value={globalFilter ?? ""}
            onChange={event => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        )}
        <DataTableViewOptions table={table} columnNames={columnNames} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
