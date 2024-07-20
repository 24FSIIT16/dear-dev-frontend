import React from 'react';
import { Button } from '@components/ui/Buttons/Button';

interface SurveyButtonProps {
  score: number;
  onClick: (score: number) => void;
  className: string;
  icon: React.ReactNode;
}

const SurveyHappinessButton: React.FC<SurveyButtonProps> = ({ score, onClick, className, icon }) => (
  <Button onClick={() => onClick(score)} variant="mood" size="mood" className={className}>
    {icon}
  </Button>
);

export default SurveyHappinessButton;
