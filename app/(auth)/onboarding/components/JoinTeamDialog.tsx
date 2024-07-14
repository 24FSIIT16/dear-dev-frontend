'use client';

import * as React from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@components/ui/Dialog/Dialog';
import { Button } from '@components/ui/Buttons/Button';

const JoinTeamDialog: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <>
      <DialogHeader>
        <DialogTitle>Join a team</DialogTitle>
        <DialogDescription>Fill the four-digit code.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit}>
          Join
        </Button>
      </DialogFooter>
    </>
  );
};

export default JoinTeamDialog;
