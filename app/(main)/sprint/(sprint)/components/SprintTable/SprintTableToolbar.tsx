import * as React from 'react';
import Link from 'next/link';
import { Table } from '@tanstack/react-table';
import { Button } from '@components/ui/Buttons/Button';
import SprintTableViewOptions from './SprintTableViewOptions';

interface SprintTableToolbarProps<TData> {
  table: Table<TData>;
}

const SprintTableToolbar = <TData,>({ table }: SprintTableToolbarProps<TData>) => (
  <div className="flex items-center justify-between">
    <Link href="/sprint/create">
      <Button>Create Sprint</Button>
    </Link>
    <SprintTableViewOptions table={table} />
  </div>
);

export default SprintTableToolbar;
