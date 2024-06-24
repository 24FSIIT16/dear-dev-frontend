import * as React from 'react';
import Link from 'next/link';
import { Home, Settings, BarChartHorizontalBig } from 'lucide-react';

const Navigation: React.FC = () => (
  <aside className="fixed inset-y-0 left-0 z-10 flex w-20 flex-col justify-between border-r bg-white pb-8 pt-4">
    <nav className="mt-2 flex flex-col items-center gap-6 px-2">
      <Link href="/">
        <Home className="h-5 w-5" />
      </Link>
      <Link href="/dashboard">
        <BarChartHorizontalBig className="h-5 w-5" />
      </Link>
    </nav>
    <nav className="flex flex-col items-center gap-6 px-2">
      <Link href="/">
        <Settings className="h-5 w-5" />
      </Link>
    </nav>
  </aside>
);

export default Navigation;
