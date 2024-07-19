/* eslint-disable @typescript-eslint/no-unsafe-return */
import cn from '@/lib/utils';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/DropdownMenu/Dropdown-menu';
import { Button } from '@components/ui/Buttons/Button';
import { ChevronsDown, ChevronsUp, ChevronsUpDown, EyeOff } from 'lucide-react';
import { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData> extends React.HtmlHTMLAttributes<HTMLDivElement> {
  column: Column<TData>;
  title: string;
}

const DataTableColumnHeader = <TData,>({ column, title, className }: DataTableColumnHeaderProps<TData>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ChevronsDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronsUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ChevronsUp className="mr-2 h-3.5 w-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ChevronsDown className="mr-2 h-3.5 w-3.5" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-3.5 w-3.5" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableColumnHeader;
