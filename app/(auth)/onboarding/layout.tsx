'use client';

import * as React from 'react';
import OnboardingHeader from './components/OnboardingHeader';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => (
  <div className="relative flex min-h-screen items-center justify-center">
    <header className="justif absolute left-0 top-0 flex w-full flex-row items-center p-16">
      <OnboardingHeader />
    </header>
    <main>
      <div>{children}</div>
    </main>
  </div>
);

export default OnboardingLayout;
