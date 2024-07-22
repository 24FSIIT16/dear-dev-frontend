import * as React from 'react';
import Separtor from '@components/ui/Separator/Separator';

interface TeamMemberLayoutProps {
  children: React.ReactNode;
}

const TeamMemberLayout: React.FC<TeamMemberLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Members</h1>
      <p className="text-md font-thin">Manage team members.</p>
    </div>
    <Separtor className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default TeamMemberLayout;
