import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16">
    <div className="space-y-0.5">
      <h1>Getting Started with Yappi</h1>
      <p className="text-md font-thin">Discover Insights, Unlock Potential.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div className="flex space-x-8">
      <div className="mt-2 flex-1">{children}</div>
    </div>
  </div>
);

export default SettingsLayout;
