/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as React from 'react';
import { Table } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@components/ui/DropdownMenu/Dropdown-menu';
import { Button } from '@components/ui/Buttons/Button';
import { Eye } from 'lucide-react';

interface TeamMemberTableViewOptionsProps<TData> {
  table: Table<TData>;
}

const TeamMemberTableViewOptions = <TData,>({ table }: TeamMemberTableViewOptionsProps<TData>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
        <Eye className="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px]">
      {table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
        .map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default TeamMemberTableViewOptions;
