import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import SidebarNav from '@components/Navigation/SidebarNav';

interface AboutLayoutProps {
  children: React.ReactNode;
}

const aboutSidebarNavItems = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact & Support',
    href: '/about/contact',
  },
  {
    title: 'FAQs',
    href: '/about/FAQ',
  },
  {
    title: 'Contribute',
    href: '/about/contribute',
  },
];

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16">
    <div className="space-y-0.5">
      <h1>Infos, Contact & Support</h1>
      <p className="text-md font-thin">Everything you need to know about yappi - Get in touch.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div className="flex space-x-8">
      <aside className="w-1/4">
        <SidebarNav items={aboutSidebarNavItems} />
      </aside>
      <div className="mt-2 flex-1">{children}</div>
    </div>
  </div>
);

export default AboutLayout;
