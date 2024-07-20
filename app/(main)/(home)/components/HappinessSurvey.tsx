'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import SurveyHappinessButton from '@components/Buttons/SurveyHappinessButton';
import { SubmitHappinessScoreDTO } from '@/types/SurveyType';
import { toast } from '@components/ui/Toast/use-toast';
import useDashboardClient from '@hooks/useDashboardClient';
import { User } from '@/types/UserType';

interface HappinessSurveyProps {
  fetchDashboardData: () => void;
  user: User;
}

const HappinessSurvey: React.FC<HappinessSurveyProps> = ({ fetchDashboardData, user }) => {
  const [rotateButton, setRotateButton] = React.useState<number | null>(null);
  const { submitHappinessScore } = useDashboardClient();

  const iconClasses = (score: number) => `h-12 w-12 ${rotateButton === score ? 'rotate-360' : ''}`;

  const handleHappinessSubmit = async (score: number) => {
    const happinessScore: SubmitHappinessScoreDTO = {
      score,
      userId: user?.id,
    };
    try {
      await submitHappinessScore(happinessScore).then(() => {
        toast({
          title: 'Success!',
          description: `Survey Submitted`,
        });
      });
      fetchDashboardData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (submitError: any) {
      toast({
        title: 'Error!',
        description: `Something went wrong. Please try again: ${submitError.message} `,
        variant: 'destructive',
      });
    }
  };

  const handleClick = (score: number) => {
    setRotateButton(score);
    setTimeout(() => setRotateButton(null), 1000);
    handleHappinessSubmit(score);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Survey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">How happy are you with your working day?</div>
        <p className="text-muted-foreground text-s mb-7">
          We want to know how satisfied you are with your workday today. Your feedback is important to us and helps us
          understand your daily work experience.
        </p>
        <div className="flex flex-row items-center justify-between">
          <SurveyHappinessButton
            score={2}
            size="mood"
            onClick={handleClick}
            className="bg-tertiaryBG-light"
            icon={<Frown className={iconClasses(2)} />}
          />
          <SurveyHappinessButton
            score={8}
            size="mood"
            onClick={handleClick}
            className="bg-primaryRed-light text-primaryRed-main"
            icon={<Annoyed className={iconClasses(8)} />}
          />
          <SurveyHappinessButton
            score={14}
            size="mood"
            onClick={handleClick}
            className="bg-primaryBlue-light text-primaryBlue-main"
            icon={<Smile className={iconClasses(14)} />}
          />
          <SurveyHappinessButton
            score={20}
            size="mood"
            onClick={handleClick}
            className="bg-primaryGreen-light text-primaryGreen-main"
            icon={<Laugh className={iconClasses(20)} />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HappinessSurvey;
