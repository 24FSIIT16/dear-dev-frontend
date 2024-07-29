'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { User } from '@/types/UserType';
import { Emotion } from '@/types/EmotionType';
import { toast } from '@components/ui/Toast/use-toast';
import useDashboardClient from '@hooks/useDashboardClient';
import { Button } from '@components/ui/Buttons/Button';
import SurveyHoverCard from './SurveyHoverCard';

interface EmotionSurveyProps {
  emotions: Array<Emotion>;
  user: User;
  fetchDashboardData: () => void;
}

const EmotionSurvey: React.FC<EmotionSurveyProps> = ({ fetchDashboardData, emotions, user }) => {
  const { submitEmotions } = useDashboardClient();

  const handleClick = async (emotionId: number) => {
    try {
      await submitEmotions({ userId: user.id, emotionId });
      toast({
        title: 'Success!',
        description: `Emotion submitted`,
      });
      fetchDashboardData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error!',
        description: `Failed to submit emotion: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="flex h-full flex-col rounded-2xl border-black shadow-none">
      <CardHeader className="flex flex-row">
        <div className="flex-1" />
        <SurveyHoverCard title="Track emotions" description="Text for emotions" />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-end">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                variant="outline"
                className="rounded-xl border-black text-sm font-light"
                onClick={() => handleClick(emotion.id)}
              >
                {emotion.name.toUpperCase()}
              </Button>
            ))}
          </div>
          <p className="md:text-md text-sm font-light">How do you feel?</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionSurvey;
