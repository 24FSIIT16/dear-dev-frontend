import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Dashboard</h1>
      <p className="text-md font-thin">
        Manage your surveys, track workkind, stay updated, and optimize your day — all in one place.
      </p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default HomeLayout;
