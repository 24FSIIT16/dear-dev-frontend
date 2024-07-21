/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/prefer-default-export */

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
import { Ellipsis, Settings, Users } from 'lucide-react';
import { Button } from '@components/ui/Buttons/Button';
import { Team } from '@/types/TeamType';
import Link from 'next/link';

export const columns: ColumnDef<Team>[] = [
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
      return <span>{format(date, 'yyyy-MM-dd')}</span>;
    },
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
    accessorKey: 'code',
    header: 'Team code',
    cell: ({ row }) => {
      const { role, code } = row.original;
      return role === 'ADMIN' ? <span>{code}</span> : '-';
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
          <DropdownMenuContent align="end" className="space-y-1">
            {team.role === 'ADMIN' && (
              <DropdownMenuItem>
                <Link href={`/team/${team.id}/config`}>
                  <div className="flex w-full items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit team
                  </div>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link href={`/team/${team.id}/members`}>
                <div className="flex w-full items-center justify-between">
                  <Users className="mr-2 h-4 w-4" />
                  Show members
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
