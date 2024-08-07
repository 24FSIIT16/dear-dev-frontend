import * as React from 'react';
import SidebarNav from '@components/Navigation/SidebarNav';
import Separator from '@components/ui/Separator/Separator';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const settingsSidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings',
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
  },
];

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16">
    <div className="space-y-0.5">
      <h1>Settings</h1>
      <p className="text-md font-thin">Manage your settings.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div className="flex space-x-8">
      <aside className="w-1/4">
        <SidebarNav items={settingsSidebarNavItems} />
      </aside>
      <div className="mb-16 mt-2 flex-1">{children}</div>
    </div>
  </div>
);

export default SettingsLayout;
