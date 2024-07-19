/* eslint-disable @typescript-eslint/no-redeclare */

'use client';

import { Badge } from '@components/ui/Badge/Badge';
import { format } from 'date-fns';
import DataTableColumnHeader from '@components/ui/Table/DataTableColumnHeader';
import { ColumnDef } from '@tanstack/react-table';
import cn from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@components/ui/DropdownMenu/Dropdown-menu';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { Button } from '@components/ui/Buttons/Button';

export type TeamType = {
  id: string;
  name: string;
  createdAt: string;
  role: 'ADMIN' | 'MEMBER';
};

export const columns: ColumnDef<TeamType>[] = [
  {
    accessorKey: 'id',
    header: '',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span>{format(date, 'yyyy-MM-dd')}</span>
    }
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const { role } = row.original;
      return (
        <Badge variant="secondary" className={cn('px-2 font-medium', { 'bg-primaryBlue-light': role === 'ADMIN' })}>
          {role}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const team = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            {team.role === 'ADMIN' && (
              <DropdownMenuItem>
                <div className="flex w-full items-center justify-between">
                  Team settings
                  <ChevronRight className="ml-8 h-4 w-4" />
                </div>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <div className="flex w-full items-center justify-between">
                Team members
                <ChevronRight className="ml-8 h-4 w-4" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
