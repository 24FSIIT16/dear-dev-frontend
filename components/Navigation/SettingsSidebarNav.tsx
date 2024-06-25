'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@components/ui/Buttons/Button';

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
  }[];
}

const SettingsSidebarNav: React.FC<SidebarNavProps> = ({ items }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const getButtonStyle = (href: string) =>
    `hover:bg-tertiaryBG-light hover:dark:bg-secondaryBG-dark ${
      pathname === href
        ? theme === 'dark'
          ? 'bg-secondaryBG-dark'
          : theme === 'light'
            ? 'bg-tertiaryBG-light'
            : ''
        : ''
    }`;

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button variant="ghost" className={getButtonStyle(item.href)}>
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default SettingsSidebarNav;
