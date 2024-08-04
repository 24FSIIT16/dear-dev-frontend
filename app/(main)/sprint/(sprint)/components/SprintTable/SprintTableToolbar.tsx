import * as React from 'react';
import { Table } from '@tanstack/react-table';
import SprintTableViewOptions from './SprintTableViewOptions';

interface SprintTableToolbarProps<TData> {
  table: Table<TData>;
}

const SprintTableToolbar = <TData,>({ table }: SprintTableToolbarProps<TData>) => (
  <div className="flex justify-end">
    <SprintTableViewOptions table={table} />
  </div>
);

export default SprintTableToolbar;
