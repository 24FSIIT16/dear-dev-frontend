import React from 'react';
import { Button } from '@components/ui/Buttons/Button';

interface SurveyButtonProps {
  score: number;
  onClick: (score: number) => void;
  className: string;
  icon: React.ReactNode;
  size: 'icon' | 'default' | 'mood' | 'sm' | 'lg' | 'navigation' | null | undefined;
}

const SurveyHappinessButton: React.FC<SurveyButtonProps> = ({ score, onClick, className, icon, size }) => (
  <Button onClick={() => onClick(score)} variant="mood" size={size} className={className}>
    {icon}
  </Button>
);

export default SurveyHappinessButton;
