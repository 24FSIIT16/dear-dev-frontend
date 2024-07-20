'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import SurveyHappinessButton from '@components/Buttons/SurveyHappinessButton';

interface HappinessSurveyProps {
  onSubmit: (score: number) => void;
}

const HappinessSurvey: React.FC<HappinessSurveyProps> = ({ onSubmit }) => {
  const [rotateButton, setRotateButton] = React.useState<number | null>(null);

  const handleClick = (score: number) => {
    setRotateButton(score);
    setTimeout(() => setRotateButton(null), 1000);
    onSubmit(score);
  };

  const iconClasses = (score: number) => `h-12 w-12 ${rotateButton === score ? 'rotate-360' : ''}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Survey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">How happy are you with your working day?</div>
        <p className="text-muted-foreground text-s mb-7">
          Submit your overall happiness survey to track your happiness with your work day.
        </p>
        <div className="flex flex-row items-center justify-between">
          <SurveyHappinessButton
            score={2}
            onClick={handleClick}
            className="bg-tertiaryBG-light"
            icon={<Frown className={iconClasses(2)} />}
          />
          <SurveyHappinessButton
            score={8}
            onClick={handleClick}
            className="bg-primaryRed-light text-primaryRed-main"
            icon={<Annoyed className={iconClasses(8)} />}
          />
          <SurveyHappinessButton
            score={14}
            onClick={handleClick}
            className="bg-primaryBlue-light text-primaryBlue-main"
            icon={<Smile className={iconClasses(14)} />}
          />
          <SurveyHappinessButton
            score={20}
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
