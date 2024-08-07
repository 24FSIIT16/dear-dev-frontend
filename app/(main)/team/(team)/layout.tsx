import * as React from 'react';
import Separtor from '@components/ui/Separator/Separator';

interface TeamLayoutProps {
  children: React.ReactNode;
}

const TeamLayout: React.FC<TeamLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Team</h1>
      <p className="text-md font-thin">Together we achieve more - manage your teams.</p>
    </div>
    <Separtor className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default TeamLayout;
