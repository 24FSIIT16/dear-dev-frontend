import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16">
    <div className="space-y-0.5">
      <h1>Insights</h1>
      <p className="text-md font-thin">Gain insights from the happiness data you collected.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default DashboardLayout;
