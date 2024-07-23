'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/Buttons/Button';
import { usePathname } from 'next/navigation';

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
  }[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <Button className="w-3/4 justify-start" variant={isActive ? 'selected' : 'ghost'}>
              {item.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
