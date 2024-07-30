import * as React from 'react';
import Separtor from '@components/ui/Separator/Separator';

interface TeamConfigLayoutProps {
  children: React.ReactNode;
}

const TeamConfigLayout: React.FC<TeamConfigLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Team configurations</h1>
      <p className="text-md font-thin">Customize your teams experience.</p>
    </div>
    <Separtor className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default TeamConfigLayout;
