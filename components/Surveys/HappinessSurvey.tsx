'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Button } from '@components/ui/Buttons/Button';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';

interface HappinessSurveyProps {
  onSubmit: (score: number) => void;
}

const HappinessSurvey: React.FC<HappinessSurveyProps> = ({ onSubmit }) => {
  const handleClick = (score: number) => {
    onSubmit(score);
  };
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
        <div className="margin flex flex-row items-center justify-between">
          <Button onClick={() => handleClick(1)} variant="mood" size="mood" className="bg-tertiaryBG-light">
            <Frown className="h-12 w-12 text-black" />
          </Button>
          <Button onClick={() => handleClick(2)} variant="mood" size="mood" className="bg-primaryRed-light">
            <Annoyed className="h-12 w-12 text-primaryRed-main" />
          </Button>
          <Button onClick={() => handleClick(3)} variant="mood" size="mood" className="bg-primaryBlue-light">
            <Smile className="h-12 w-12 text-primaryBlue-main" />
          </Button>
          <Button onClick={() => handleClick(4)} variant="mood" size="mood" className="bg-primaryGreen-light">
            <Laugh className="h-12 w-12 text-primaryGreen-main" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HappinessSurvey;
