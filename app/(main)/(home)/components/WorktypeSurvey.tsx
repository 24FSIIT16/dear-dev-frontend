'use client';

import * as React from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { WorkKindAndTeamName } from '@/types/WorkKindType';
import { Annoyed, Frown, Laugh, Smile, FilePlus } from 'lucide-react';
import useDashboardClient from '@hooks/useDashboardClient';
import { User } from '@/types/UserType';
import { SubmitWorkKindScoreDTO } from '@/types/SurveyType';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from 'sonner';

interface WorktypeSurveyProps {
  workKinds: WorkKindAndTeamName[];
  user: User;
  reloadDashboardData: () => void;
}

const WorktypeSurvey: React.FC<WorktypeSurveyProps> = ({ reloadDashboardData, workKinds, user }) => {
  const { submitWorkKindScore } = useDashboardClient();

  const handleSubmit = async (score: number, workKindId: number) => {
    const workKindScore: SubmitWorkKindScoreDTO = {
      score,
      userId: user.id,
      workKindId,
    };

    try {
      await submitWorkKindScore(workKindScore);
      toast.success('Worktype score has been submitted');
      reloadDashboardData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Something went wrong: ${error.message}`);
      } else {
        console.warn('Error: ', error);
      }
    }
  };

  return (
    <Card className="flex h-full flex-col rounded-2xl border-black shadow-none dark:border-white">
      <CardHeader className="flex flex-row">
        <div className="flex-1" />
        <div className="rounded-full bg-slate-900 p-2 text-white dark:bg-white dark:text-black">
          <FilePlus className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-end">
        {workKinds.map((workKindDto) => (
          <div
            className="mb-4 flex w-full flex-col items-start gap-2 sm:flex-row md:items-center"
            key={workKindDto.workKind.id}
          >
            <div className="flex min-w-40 flex-col gap-2 md:flex-row md:items-center">
              <h1 className="font-light">{workKindDto.workKind.name}</h1>
              <p className="text-xs font-light">{`(${workKindDto.teamName})`}</p>
            </div>
            <div className="flex flex-row space-x-2 md:ml-auto md:space-x-0">
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(2, workKindDto.workKind.id)}
              >
                <Frown className="h-6 w-6" />
              </Button>
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(8, workKindDto.workKind.id)}
              >
                <Annoyed className="h-6 w-6" />
              </Button>
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(14, workKindDto.workKind.id)}
              >
                <Smile className="h-6 w-6" />
              </Button>
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(20, workKindDto.workKind.id)}
              >
                <Laugh className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}
        <p className="md:text-md text-sm font-light">How happy are you with specific worktypes?</p>
      </CardContent>
    </Card>
  );
};

export default WorktypeSurvey;
