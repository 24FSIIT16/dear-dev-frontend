/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as React from 'react';
import Input from '@components/ui/Input/Input';
import { Table } from '@tanstack/react-table';
import TeamTableViewOptions from './TeamTableViewOptions';

interface TeamTableToolbarProps<TData> {
  table: Table<TData>;
}

const TeamTableToolbar = <TData,>({ table }: TeamTableToolbarProps<TData>) => (
  <div className="flex items-center justify-between">
    <div className="max-w-4xl">
      <Input
        placeholder="Search name"
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        className="h-8"
      />
    </div>
    <TeamTableViewOptions table={table} />
  </div>
);

export default TeamTableToolbar;
