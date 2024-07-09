import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';

interface AboutLayoutProps {
  children: React.ReactNode;
}

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>About Us</h1>
      <p className="text-md font-thin">Gain insights into the team behind yappi or contribute.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default AboutLayout;
