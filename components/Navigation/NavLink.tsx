'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@components/ui/Tooltip/Tooltip';
import formatTooltipContent from '@components/Navigation/Navigation.utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const isActive = (path: string) => pathname === href || pathname.startsWith(`${path}/`);

  const getLinkStyle = () =>
    `flex h-10 w-10 items-center justify-center rounded-md hover:bg-tertiaryBG-light hover:dark:bg-secondaryBG-dark ${
      isActive(href) ? (theme === 'dark' ? 'bg-secondaryBG-dark' : theme === 'light' ? 'bg-tertiaryBG-light' : '') : ''
    }`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={getLinkStyle()}>
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="z-50 font-outfit text-xs font-light">
          {formatTooltipContent(href)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavLink;
