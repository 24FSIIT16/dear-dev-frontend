'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage } from '@components/ui/Avatar/Avatar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@components/ui/Breadcrumb/Breadcrumb';
import getBreadcrumbs from './Header.utils';

const Header: React.FC = () => {
  const pathname = usePathname();

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="fixed left-20 top-0 z-20 flex h-16 w-[calc(100%-5rem)] items-center justify-between bg-white px-16">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <>
              <BreadcrumbItem key={breadcrumb.href}>
                <BreadcrumbLink asChild>
                  <Link className="text-xs font-light text-black" href={breadcrumb.href}>
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Link href="/">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/assets/Avatar/avatar_1.svg" />
        </Avatar>
      </Link>
    </header>
  );
};

export default Header;
