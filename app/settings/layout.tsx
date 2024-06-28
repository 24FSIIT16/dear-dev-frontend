import SettingsSidebarNav from '@components/Navigation/SettingsSidebarNav';
import Separator from '@components/ui/Separator/Separator';
import * as React from 'react';

const settingsSidebarNavItems = [
  {
    title: 'Account',
    href: '/settings',
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
  },
];

const SettingsLayout: React.FC<React.ReactNode> = ({ children }) => (
  <div className="space-y-8 px-16">
    <div className="space-y-0.5">
      <h1>Settings</h1>
      <p className="text-md font-thin">Manage your settings.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div className="flex space-x-8">
      <aside className="w-1/4">
        <SettingsSidebarNav items={settingsSidebarNavItems} />
      </aside>
      <div className="mt-2 flex-1">{children}</div>
    </div>
  </div>
);

export default SettingsLayout;
