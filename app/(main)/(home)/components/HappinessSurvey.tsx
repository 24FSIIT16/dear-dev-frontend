'use client';

import * as React from 'react';
import axios from 'axios';
import { User } from '@/types/UserType';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import useDashboardClient from '@hooks/useDashboardClient';
import { SubmitHappinessScoreDTO } from '@/types/SurveyType';
import { Annoyed, Frown, Laugh, Smile, FilePlus } from 'lucide-react';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from 'sonner';

interface HappinessSurveyProps {
  reloadDashboardData: () => void;
  user: User;
}

const HappinessSurvey: React.FC<HappinessSurveyProps> = ({ reloadDashboardData, user }) => {
  const { submitHappinessScore } = useDashboardClient();

  const handleSubmit = async (score: number) => {
    const happinessScore: SubmitHappinessScoreDTO = {
      score,
      userId: user?.id,
    };
    try {
      await submitHappinessScore(happinessScore).then(() => {
        toast.success('Happiness score has been submitted');
      });
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
        <div className="flex flex-col space-y-2">
          <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="icon" size="mood" className="rounded-full" onClick={() => handleSubmit(2)}>
              <Frown className="h-14 w-14" />
            </Button>
            <Button variant="icon" size="mood" className="rounded-full" onClick={() => handleSubmit(8)}>
              <Annoyed className="h-14 w-14" />
            </Button>
            <Button variant="icon" size="mood" className="rounded-full" onClick={() => handleSubmit(14)}>
              <Smile className="h-14 w-14" />
            </Button>
            <Button variant="icon" size="mood" className="rounded-full" onClick={() => handleSubmit(20)}>
              <Laugh className="h-14 w-14" />
            </Button>
          </div>
          <p className="md:text-md text-sm font-light">How happy are you with your working day?</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HappinessSurvey;
