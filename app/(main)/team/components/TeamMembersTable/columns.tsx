/* eslint-disable import/prefer-default-export */

import { TeamMemberWithUser } from '@/types/TeamMemberType';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@components/ui/Badge/Badge';
import cn from '@/lib/utils';
import { format } from 'date-fns';
import DataTableColumnHeader from '@components/ui/Table/DataTableColumnHeader';
import { Asterisk } from 'lucide-react';

export const columns = (currentUserId: number): ColumnDef<TeamMemberWithUser>[] => [
  {
    id: 'activeUser',
    cell: ({ row }) => <div>{currentUserId === row.original.user.id && <Asterisk className="h-4 w-4" />}</div>,
  },
  {
    id: 'name',
    accessorKey: 'user.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    id: 'username',
    accessorKey: 'user.username',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ row }) => {
      const username = row.original.user?.username;
      return username || '-';
    },
  },
  {
    id: 'joinedAt',
    accessorKey: 'joinedAt',
    header: 'Joined At',
    cell: ({ row }) => {
      const { joinedAt } = row.original;
      return joinedAt ? format(new Date(joinedAt), 'yyyy-MM-dd') : '-';
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
    id: 'status',
    accessorKey: 'active',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const { active } = row.original;
      return (
        <Badge
          variant="secondary"
          className={cn('px-2 font-medium', {
            'bg-primaryGreen-light': active === true,
            'bg-primaryRed-light': active === false,
          })}
        >
          {active ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
];
