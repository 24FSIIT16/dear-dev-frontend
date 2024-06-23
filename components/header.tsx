import * as React from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@components/ui/Avatar/avatar';

const Header = () => (
  <header className="fixed left-20 top-0 z-20 flex h-16 w-[calc(100%-5rem)] items-center justify-end px-16">
    <Link href="/">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/assets/Avatar/avatar_1.svg" />
      </Avatar>
    </Link>
  </header>
);
export default Header;
