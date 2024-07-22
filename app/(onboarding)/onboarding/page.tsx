'use client';

import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/Dialog/Dialog';
import { Plus, Users } from 'lucide-react';
import SelectableCard from './components/SelectableCard';
import CreateTeamDialog from './components/CreateTeamDialog';
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
    <Dialog>
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <div className="mb-8">
          <h1>How would you like to use yappi?</h1>
          <p>You have just created an account. Choose what to do next.</p>
        </div>
        <div className="mb-4 flex flex-row gap-8">
          <DialogTrigger asChild>
            <SelectableCard
              onClick={() => handleSelect('personal')}
              icon={<Plus className="h-8 w-8 text-white group-hover:text-primaryGreen-main" />}
              title="Create a team"
              description="Start yappi as an individual to track your happiness. You can later invite members to join your team workspace."
            />
          </DialogTrigger>
          <DialogTrigger asChild>
            <SelectableCard
              onClick={() => handleSelect('team')}
              icon={<Users className="h-8 w-8 text-white group-hover:text-primaryGreen-main" />}
              title="Join a team"
              description="Select this option if you have been invited to a team workspace and have received a four-digit code."
            />
          </DialogTrigger>
        </div>
        <DialogContent>{renderDialogContent()}</DialogContent>
      </div>
    </Dialog>
  );
};

export default OnboardingPage;
