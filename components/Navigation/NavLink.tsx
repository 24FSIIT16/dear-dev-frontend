'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkClasses = () =>
    `flex h-10 w-10 items-center justify-center rounded-md hover:bg-tertiaryBG-light ${isActive ? 'bg-tertiaryBG-light' : ''}`;

  return (
    <Link href={href} className={linkClasses(href)}>
      {children}
    </Link>
  );
};

export default NavLink;
