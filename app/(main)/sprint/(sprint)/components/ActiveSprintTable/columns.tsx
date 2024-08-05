/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/prefer-default-export */

'use client';

import { ActiveSprint } from '@/types/SprintType';
import DataTableColumnHeader from '@components/ui/Table/DataTableColumnHeader';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@components/ui/Badge/Badge';
import { differenceInDays } from 'date-fns';
import cn from '@/lib/utils';

export const columns: ColumnDef<ActiveSprint>[] = [
  {
    accessorKey: 'teamName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Team" />,
  },
  {
    accessorKey: 'sprint.sprintName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sprint" />,
  },
  {
    accessorKey: 'sprint.endDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
  },
  {
    accessorKey: 'daysLeft',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Days Left" />,
    cell: ({ row }) => {
      const endDate = new Date(row.original.sprint.endDate);
      const currentDate = new Date();
      const durationInDays = differenceInDays(endDate, currentDate);

      return `${durationInDays}`;
    },
  },
  {
    accessorKey: 'sprint.status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original.sprint;
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
];
