import * as React from 'react';
import { Home, Settings, BarChartHorizontalBig } from 'lucide-react';
import NavLink from '@components/Navigation/NavLink';

const Navigation: React.FC = () => (
  <aside className="fixed inset-y-0 left-0 z-50 flex w-20 flex-col justify-between border-r bg-white pb-8 pt-4">
    <nav className="mt-1 flex flex-col items-center gap-6 px-2">
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
