import * as React from 'react';
import Separtor from '@components/ui/Separator/Separator';

interface SprintLayoutProps {
  children: React.ReactNode;
}

const SprintLayout: React.FC<SprintLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Sprint</h1>
      <p className="text-md font-thin">Together we achieve more - manage your sprints.</p>
    </div>
    <Separtor className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default SprintLayout;
