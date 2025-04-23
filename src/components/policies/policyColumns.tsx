'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '../table/ColumnHeader';
import { formatDate } from '@/lib/functions';

export const columns: ColumnDef<{
  id: number;
  policyNumber: string;
  policyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  premium: number;
  duration: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
}>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    accessorKey: 'policyNumber',
    header: 'Policy Number',
  },
  {
    accessorKey: 'policyName',
    header: 'Policy Name',
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'premium',
    header: 'Premium (₦)',
    cell: ({ row }) => {
      return <span>{row.original.premium.toLocaleString('en-NG')}</span>;
    },
  },
  {
    accessorKey: 'duration',
    header: 'Duration (Years)',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      return <span>{formatDate(row.original.startDate)}</span>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      return <span>{formatDate(row.original.endDate)}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs capitalize ${
            row.original?.status?.toLocaleLowerCase() === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="bg-[#f6f6f6] h-8 w-8 flex justify-center items-center rounded-full outline-none cursor-pointer"
              onClick={(e) => e.stopPropagation()} // Prevent row click when clicking dropdown
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
              }}
            >
              Policy Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
              }}
            >
              Export to CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
