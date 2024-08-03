'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@components/ui/Breadcrumb/Breadcrumb';
import HeaderNavigationMenu from '@components/NavigationMenu/HeaderNavigationMenu';
import getBreadcrumbs from './Header.utils';
import Account from './Account';

const Header: React.FC = () => {
  const pathname = usePathname();

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky left-20 top-0 z-20 flex h-16 w-[calc(100%-5rem)] items-center justify-between bg-white px-16 dark:bg-primaryBG-dark">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbItem key={breadcrumb.href}>
                <BreadcrumbLink asChild>
                  <Link className="text-xs font-light text-black dark:text-white" href={breadcrumb.href}>
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center space-x-4">
        <HeaderNavigationMenu />
        <Account />
      </div>
    </header>
  );
};
export default Header;
