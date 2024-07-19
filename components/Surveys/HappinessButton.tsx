import React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { Frown, Annoyed, Smile, Laugh } from 'lucide-react';
import { AverageScoreResponse } from '@/types/SurveyType';

interface HappinessButtonProps {
  score: AverageScoreResponse | number;
}

const HappinessButton: React.FC<HappinessButtonProps> = ({ score }) => {
  if (score === null) return null;

  if (score === 1) {
    return (
      <Button variant="mood" disabled size="mood" className="flex items-center justify-center bg-tertiaryBG-light">
        <Frown className="h-12 w-12 text-black" />
      </Button>
    );
  }
  if (score === 2) {
    return (
      <Button variant="mood" disabled size="mood" className="flex items-center justify-center bg-primaryRed-light">
        <Annoyed className="h-12 w-12 text-primaryRed-main" />
      </Button>
    );
  } else if (score === 3) {
    return (
      <Button variant="mood" disabled size="mood" className="flex items-center justify-center bg-primaryBlue-light">
        <Smile className="h-12 w-12 text-primaryBlue-main" />
      </Button>
    );
  } else {
    return (
      <Button variant="mood" disabled size="mood" className="flex items-center justify-center bg-primaryGreen-light">
        <Laugh className="h-12 w-12 text-primaryGreen-main" />
      </Button>
    );
  }
};

export default HappinessButton;
