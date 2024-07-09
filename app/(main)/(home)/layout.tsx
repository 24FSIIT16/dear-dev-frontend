import * as React from 'react';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div>{children}</div>
  </div>
);

export default HomeLayout;
