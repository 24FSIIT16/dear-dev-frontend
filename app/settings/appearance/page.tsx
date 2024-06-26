'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import Separator from '@components/ui/Separator/Separator';

const Appearance: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState<string>(theme);

  const handleSelect = (mode: string) => {
    setSelectedTheme(mode);
    setTheme(mode);
  };

  const formattedTheme = selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2>Appearance</h2>
        <p className="text-sm font-thin">Customize the appearance of the app. Switch between day and night themes.</p>
      </div>
      <Separator className="mt-2" />
      <div className="space-y-1">
        <h3>Theme</h3>
        <p className="text-xs font-thin">Select the theme for the application.</p>
        <p className="text-xs font-thin">
          Current theme: <span className="text-xs font-medium">{formattedTheme}</span>{' '}
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <button type="button" className="cursor-pointer" onClick={() => handleSelect('light')}>
          <div
            className={`items-center rounded-md border-2 p-1 ${selectedTheme === 'light' ? 'border-primaryBlue-main' : ''}`}
          >
            <div className="space-y-3 rounded-md bg-secondaryBG-light p-2 shadow-sm">
              <div className="h-3 w-[70px] rounded-md bg-tertiaryBG-light" />
              <div className="h-3 w-[100px] rounded-md bg-tertiaryBG-light" />
            </div>
          </div>
          <span className="block w-full p-2 text-center text-xs font-thin">Light</span>
        </button>

        <button type="button" className="cursor-pointer" onClick={() => handleSelect('dark')}>
          <div
            className={`items-center rounded-md border-2 p-1 ${selectedTheme === 'dark' ? 'border-primaryBlue-main' : ''}`}
          >
            <div className="space-y-3 rounded-md bg-primaryBG-dark p-2 shadow-sm">
              <div className="h-3 w-[70px] rounded-md bg-tertiaryBG-dark" />
              <div className="h-3 w-[100px] rounded-md bg-tertiaryBG-dark" />
            </div>
          </div>
          <span className="block w-full p-2 text-center text-xs font-thin">Dark</span>
        </button>
      </div>
    </div>
  );
};

export default Appearance;
