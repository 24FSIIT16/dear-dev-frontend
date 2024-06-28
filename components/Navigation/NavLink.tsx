'use client';

import * as React from 'react';
import Link from 'next/link';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@components/ui/Tooltip/Tooltip';
import formatTooltipContent from '@components/Navigation/Navigation.utils';
import { usePathname } from 'next/navigation';
import { Button } from '@components/ui/Buttons/Button';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === href || pathname.startsWith(`${path}/`);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="">
            <Button variant={isActive(href) ? 'selected' : 'icon'} size="navigation">
              {children}
            </Button>
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
