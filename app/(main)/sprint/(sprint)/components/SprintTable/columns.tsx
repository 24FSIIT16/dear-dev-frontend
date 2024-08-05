/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/prefer-default-export */

'use client';

import DataTableColumnHeader from '@components/ui/Table/DataTableColumnHeader';
import { format, differenceInDays } from 'date-fns';
import Link from 'next/link';
import { Button } from '@components/ui/Buttons/Button';
import { Badge } from '@components/ui/Badge/Badge';
import { Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Sprint } from '@/types/SprintType';
import cn from '@/lib/utils';

export const columns: ColumnDef<Sprint>[] = [
  {
    accessorKey: 'id',
    header: '',
  },
  {
    accessorKey: 'sprintName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
    cell: ({ row }) => {
      const { startDate } = row.original;
      const { endDate } = row.original;
      return `${String(startDate)} - ${String(endDate)}`;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.startDate).getTime();
      const dateB = new Date(rowB.original.startDate).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: 'days',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Days" />,
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);
      const durationInDays = differenceInDays(endDate, startDate);

      return `${durationInDays}`;
    },
    sortingFn: (rowA, rowB) => {
      const startDateA = new Date(rowA.original.startDate);
      const endDateA = new Date(rowA.original.endDate);
      const startDateB = new Date(rowB.original.startDate);
      const endDateB = new Date(rowB.original.endDate);

      const durationA = differenceInDays(endDateA, startDateA);
      const durationB = differenceInDays(endDateB, startDateB);

      return durationA - durationB;
    },
  },
  {
    accessorKey: 'sprintGoal',
    header: 'Sprint Goal',
    cell: ({ row }) => {
      const { sprintGoal } = row.original;
      const maxLenght = 30;
      return <span>{sprintGoal.length > maxLenght ? `${sprintGoal.substring(0, maxLenght)}...` : sprintGoal}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span>{format(date, 'yyyy-MM-dd')}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original;
      const statusText = status === 'IN_PROGRESS' ? 'IN PROGRESS' : status;
      const badgeClass =
        status === 'COMPLETED' ? 'bg-primaryRed-light' : status === 'IN_PROGRESS' ? 'bg-primaryGreen-light' : '';

      return (
        <Badge variant="secondary" className={cn('px-2 font-medium', badgeClass)}>
          {statusText}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Link href={`/sprint/${id}/update`}>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
