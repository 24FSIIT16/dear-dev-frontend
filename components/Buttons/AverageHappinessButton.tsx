import React from 'react';
import { Frown, Annoyed, Smile, Laugh, BoxSelect } from 'lucide-react';
import { AverageScoreResponse } from '@/types/DashboardType';

interface HappinessButtonProps {
  score: AverageScoreResponse | number;
  size?: string;
}

const AverageHappinessButton: React.FC<HappinessButtonProps> = ({ score, size }) => {
  const scoreValue = typeof score === 'number' ? score : score.averageScore;

  if (scoreValue > 0 && scoreValue < 5) {
    return <Frown className={`rotate-360 h-16 w-16 text-black ${size}`} />;
  }
  if (scoreValue >= 5 && scoreValue < 11) {
    return <Annoyed className={`rotate-360 h-16 w-16 text-primaryRed-main ${size}`} />;
  }
  if (scoreValue >= 11 && scoreValue < 17) {
    return <Smile className={`rotate-360 h-16 w-16 text-primaryBlue-main ${size}`} />;
  }
  if (scoreValue >= 17 && scoreValue <= 21) {
    return <Laugh className={`rotate-360 h-16 w-16 text-primaryGreen-main ${size}`} />;
  }
  return <BoxSelect className={`h-16 w-16 text-black ${size}`} />;
};

export default AverageHappinessButton;
