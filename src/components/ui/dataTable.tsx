'use client';

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import PeriodFilter from '../general/PeriodFilter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { DataTablePagination } from '../table/TablePagination';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
const emptyMessage = 'No client records found.';

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const [appliedRange, setAppliedRange] = useState<{ from?: Date; to?: Date }>(
    {}
  );
  const filteredColumns = [...table.getAllColumns()];
  if (filteredColumns.length > 1) {
    filteredColumns.splice(0, 1);
    filteredColumns.splice(filteredColumns.length - 1, 1);
  }

  const [selectedFilter, setSelectedFilter] = useState(
    filteredColumns[0]?.id || ''
  );

  return (
    <div className="bg-white shadow-sm rounded p-4 md:p-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-wrap items-end gap-3">
          {filteredColumns.map(
            (column) =>
              column.id === selectedFilter && (
                <input
                  key={column.id}
                  placeholder={`Filter by ${column.id}...`}
                  value={
                    (table.getColumn(column.id)?.getFilterValue() as string) ??
                    ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(column.id)
                      ?.setFilterValue(event.target.value)
                  }
                  className="w-52 px-3 py-1.5 text-gray-700 border-b !border-b-gray-200 outline-b outline-0 focus:border-b-2 focus:!border-b-primary rounded-none capitalize text-sm"
                />
              )
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white border text-primary border-gray-200 rounded p-2.5 hover:text-white hover:bg-primary/75 outline-none cursor-pointer">
                <FunnelIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filteredColumns.map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  className={`capitalize cursor-pointer text-gray-500 hover:!bg-secondary-50 ${
                    selectedFilter === column.id
                      ? 'bg-primary/10 text-primary'
                      : ''
                  }`}
                  onClick={() => setSelectedFilter(column.id)}
                >
                  {column.id}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => setColumnFilters([])}
                className="!text-red-500 hover:!text-red-500 hover:!bg-red-50 cursor-pointer"
              >
                <XMarkIcon className="text-red-500 h-4 w-4 mr-0.5" />
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <PeriodFilter
          setAppliedRange={setAppliedRange}
          appliedRange={appliedRange}
        />
      </div>

      <div className="bg-white rounded-md border mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="!bg-blue-50 !text-primary !p-3"
                    >
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
          <TableBody className="text-gray-600">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-2">
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
                  <div className="text-center py-6">
                    <Image
                      src="/images/no-records.png"
                      alt="Illustration image"
                      height={144}
                      width={150}
                      priority
                      className="w-36 mx-auto"
                    />
                    <p className="mt-2 text-gray-500">{emptyMessage}</p>
                  </div>
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
