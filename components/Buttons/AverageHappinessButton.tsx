import React from 'react';
import { Frown, Annoyed, Smile, Laugh, BoxSelect } from 'lucide-react';
import { AverageScoreResponse } from '@/types/SurveyType';

interface HappinessButtonProps {
  score: AverageScoreResponse | number;
}

const AverageHappinessButton: React.FC<HappinessButtonProps> = ({ score }) => {
  const scoreValue = typeof score === 'number' ? score : score.averageScore;

  if (scoreValue > 0 && scoreValue < 5) {
    return <Frown className="rotate-360 h-20 w-20 text-black" />;
  }
  if (scoreValue >= 5 && scoreValue < 11) {
    return <Annoyed className="rotate-360 h-20 w-20 text-primaryRed-main" />;
  }
  if (scoreValue >= 11 && scoreValue < 17) {
    return <Smile className="rotate-360 h-20 w-20 text-primaryBlue-main" />;
  }
  if (scoreValue >= 17 && scoreValue <= 21) {
    return <Laugh className="rotate-360 h-20 w-20 text-primaryGreen-main" />;
  }
  return <BoxSelect className="h-20 w-20 text-black" />;
};

export default AverageHappinessButton;
