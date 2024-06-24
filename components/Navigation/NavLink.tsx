'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@components/ui/Tooltip/Tooltip';
import formatTooltipContent from '@components/Navigation/Navigation.utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const getLinkStyle = () =>
    `flex h-10 w-10 items-center justify-center rounded-md hover:bg-tertiaryBG-light ${isActive ? 'bg-tertiaryBG-light' : ''}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={getLinkStyle()}>
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="relative z-50 font-outfit text-xs font-light">
          {formatTooltipContent(href)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavLink;
