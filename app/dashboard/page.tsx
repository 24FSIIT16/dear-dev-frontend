import * as React from 'react';
import Logo from '@components/ui/Logo/Logo';

export default function Dashboard() {
  return (
    <div className="flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center space-y-2">
      <Logo className="h-20 w-20 text-black dark:text-white" />
      <span className="text-xl font-light">yappi</span>
    </div>
  );
}
