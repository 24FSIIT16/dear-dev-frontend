import * as React from 'react';
import Link from 'next/link';
import Logo from '@components/ui/Logo/Logo';
import SidebarNav from '@components/Navigation/SidebarNav';
import Separator from '@components/ui/Separator/Separator';
import { Button } from '@components/ui/Buttons/Button';
import { CircleArrowLeft } from 'lucide-react';

interface GettingStartedLayoutProps {
  children: React.ReactNode;
}

const gettingStartedSidebarNavItems = [
  {
    title: 'Welcome',
    href: '/getting-started',
  },
  {
    title: 'Happiness Data',
    href: '/getting-started/happiness',
  },
  {
    title: 'Happiness Patterns',
    href: '/getting-started/patterns',
  },
  {
    title: 'Team Management',
    href: '/getting-started/team',
  },
  {
    title: 'Sprint Management',
    href: '/getting-started/sprint',
  },
  {
    title: 'User Profile',
    href: '/getting-started/user',
  },
  {
    title: 'Customizations',
    href: '/getting-started/settings',
  },
  {
    title: 'Usage Tips',
    href: '/getting-started/tips',
  },
];

const GettingStartedLayout: React.FC<GettingStartedLayoutProps> = ({ children }) => (
  <div>
    <header className="fixed left-0 top-0 flex w-full flex-row items-center justify-between border-b bg-white px-32 py-8 dark:bg-primaryBG-dark">
      <Link href="/">
        <Logo className="flex h-8 w-8 flex-1" />
      </Link>
      <Link href="/">
        <Button variant="outline">
          <CircleArrowLeft className="mr-2 h-4 w-4" />
          Go to Dashboard
        </Button>
      </Link>
    </header>
    <main className="flex flex-grow flex-col items-center pt-40">
      <div className="w-full max-w-7xl px-16">
        <div className="space-y-8">
          <div className="space-y-0.5">
            <h1>Getting started</h1>
            <p className="text-md font-thin">Learn the basic to get started with our yappi plattform.</p>
          </div>
          <Separator className="dark:border-secondaryBG-dark" />
          <div className="flex space-x-8">
            <aside className="w-1/4">
              <SidebarNav items={gettingStartedSidebarNavItems} />
            </aside>
            <div className="flex-1 pb-32">{children}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default GettingStartedLayout;
