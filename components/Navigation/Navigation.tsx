import * as React from 'react';
import Link from 'next/link';
import { Home, Settings, BarChartHorizontalBig } from 'lucide-react';
import NavLink from '@components/Navigation/NavLink';
import Logo from '@components/ui/Logo/Logo';

const Navigation: React.FC = () => (
  <aside className="fixed inset-y-0 left-0 z-50 flex w-20 flex-col justify-between border-r bg-white pb-8 pt-4">
    <nav className="flex flex-col items-center gap-6 px-2">
      <Link href="/">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border">
          <Logo className="h-5 w-5" />
        </div>
      </Link>
      <NavLink href="/">
        <Home className="h-5 w-5" />
      </NavLink>
      <NavLink href="/dashboard">
        <BarChartHorizontalBig className="h-5 w-5" />
      </NavLink>
    </nav>
    <nav className="flex flex-col items-center gap-6 px-2">
      <NavLink href="/settings">
        <Settings className="h-5 w-5" />
      </NavLink>
    </nav>
  </aside>
);

export default Navigation;
