'use client';

import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/Dialog/Dialog';
import SelectableCard from './components/SelectableCard';
import CreateTeamDialog from './components/CreatelTeamDialog';
import JoinTeamDialog from './components/JoinTeamDialog';

const OnboardingPage: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const renderDialogContent = () => {
    if (selected === 'personal') {
      return <CreateTeamDialog />;
    }
    if (selected === 'team') {
      return <JoinTeamDialog />;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="mb-8">
        <h1>How would you like to use yappi?</h1>
        <p>You have just created an account. Choose what to do next.</p>
      </div>
      <div className="mb-4 flex flex-row gap-8">
        <SelectableCard
          selected={selected === 'personal'}
          onClick={() => handleSelect('personal')}
          imageSrc="/assets/Illus/personal.svg"
          title="Create a team"
          description="You want to use yappi as an individual, so that you can track your own happiness. 
          If you want to start a shared team workspace, you should also select this option and invite your team members in a second step. As the initiator, you will have admin rights."
        />
        <SelectableCard
          selected={selected === 'team'}
          onClick={() => handleSelect('team')}
          imageSrc="/assets/Illus/team.svg"
          title="Join a team"
          description="You only select this option if you have been invited to a team workspace and have received a four-digit code. 
          In this workspace, you will see your individual trackings as well as an overview of the team happiness."
        />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={!selected} className="px-8">
            Continue
          </Button>
        </DialogTrigger>
        <DialogContent>{renderDialogContent()}</DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingPage;
