'use client';

import * as React from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { WorkKind } from '@/types/WorkKindType';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import useDashboardClient from '@hooks/useDashboardClient';
import { User } from '@/types/UserType';
import { SubmitWorkKindScoreDTO } from '@/types/SurveyType';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from 'sonner';
import SurveyHoverCard from './SurveyHoverCard';

interface WorktypeSurveyProps {
  workKinds: Array<WorkKind>;
  user: User;
  fetchDashboardData: () => void;
}

const WorktypeSurvey: React.FC<WorktypeSurveyProps> = ({ fetchDashboardData, workKinds, user }) => {
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
      fetchDashboardData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Something went wrong: ${error.message}`);
      } else {
        console.warn('Error: ', error);
      }
    }
  };

  return (
    <Card className="flex flex-col rounded-2xl border-black shadow-none">
      <CardHeader className="flex flex-row">
        <div className="flex-1" />
        <SurveyHoverCard title="Track happiness per worktype" description="test" />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-end">
        {workKinds.map((workKind) => (
          <div className="mb-4 flex w-full flex-col items-start gap-2 sm:flex-row md:items-center" key={workKind.id}>
            <h1 className="min-w-40 font-light">{workKind.name}</h1>
            <div className="flex flex-row space-x-2 md:ml-auto md:space-x-0">
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(2, workKind.id)}
              >
                <Frown className="h-6 w-6" />
              </Button>
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(8, workKind.id)}
              >
                <Annoyed className="h-6 w-6" />
              </Button>
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(14, workKind.id)}
              >
                <Smile className="h-6 w-6" />
              </Button>
              <Button
                variant="icon"
                size="survey"
                className="rounded-full"
                onClick={() => handleSubmit(20, workKind.id)}
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
