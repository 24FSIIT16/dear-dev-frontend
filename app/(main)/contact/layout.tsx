import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';

interface ContactLayoutProps {
  children: React.ReactNode;
}

const ContactLayout: React.FC<ContactLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Contact & Support</h1>
      <p className="text-md font-thin">Do you have any questions or need support? - Get in touch.</p>
    </div>
    <Separator className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default ContactLayout;
