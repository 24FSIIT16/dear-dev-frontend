'use client';

import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import SelectableCard from './components/SelectableCard';

const OnboardingPage: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="mb-8">
        <h1>How to start?</h1>
        <p>Get started</p>
      </div>
      <div className="mb-4 flex flex-row gap-8">
        <SelectableCard
          selected={selected === 'personal'}
          onClick={() => handleSelect('personal')}
          imageSrc="/assets/Illus/personal.svg"
          title="As an individual"
          description="It's a best option for you to exlpore or do something for all by yourself. Later, you can create a team workspace, that's easy."
        />
        <SelectableCard
          selected={selected === 'team'}
          onClick={() => handleSelect('team')}
          imageSrc="/assets/Illus/team.svg"
          title="As a part of a team"
          description="It's a best option for you to exlpore or do something for all by yourself. Later, you can create a team workspace, that's easy."
        />
      </div>
      <Button className="bg-primaryBlue-main px-8 hover:bg-primaryBlue-main">Continue</Button>
    </div>
  );
};

export default OnboardingPage;
