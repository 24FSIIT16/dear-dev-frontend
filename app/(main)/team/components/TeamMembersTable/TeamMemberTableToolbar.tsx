/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as React from 'react';
import Input from '@components/ui/Input/Input';
import { Table } from '@tanstack/react-table';
import TeamMemberTableViewOptions from './TeamMemberTableViewOptions';

interface TeamMemberTableToolbarProps<TData> {
  table: Table<TData>;
}

const TeamMemberTableToolbar = <TData,>({ table }: TeamMemberTableToolbarProps<TData>) => (
  <div className="flex items-center justify-between">
    <div className="max-w-4xl">
      <Input
        placeholder="Search member"
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        className="h-10"
      />
    </div>
    <TeamMemberTableViewOptions table={table} />
  </div>
);

export default TeamMemberTableToolbar;
