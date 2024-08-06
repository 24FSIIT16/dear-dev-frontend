'use client';

import * as React from 'react';
import axios from 'axios';
import { User } from '@/types/UserType';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import useDashboardClient from '@hooks/useDashboardClient';
import { SubmitHappinessScoreDTO } from '@/types/SurveyType';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from 'sonner';
import SurveyHoverCard from './SurveyHoverCard';

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
    <Card className="flex h-full flex-col rounded-2xl border-black shadow-none">
      <CardHeader className="flex flex-row">
        <div className="flex-1" />
        <SurveyHoverCard
          title="Track happiness"
          description="We want to know how satisfied you are with your workday today. Your feedback is important to us and helps us understand your daily work experience."
        />
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
