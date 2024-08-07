'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { User } from '@/types/UserType';
import { Emotion } from '@/types/EmotionType';
import { toast } from 'sonner';
import useDashboardClient from '@hooks/useDashboardClient';
import { Button } from '@components/ui/Buttons/Button';
import axios from 'axios';
import SurveyHoverCard from './SurveyHoverCard';

interface EmotionSurveyProps {
  emotions: Array<Emotion>;
  user: User;
  reloadDashboardData: () => void;
}

const EmotionSurvey: React.FC<EmotionSurveyProps> = ({ reloadDashboardData, emotions, user }) => {
  const { submitEmotions } = useDashboardClient();

  const handleSubmit = async (emotionId: number) => {
    try {
      await submitEmotions({ userId: user.id, emotionId });
      toast.success('Emotion has been submitted');
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
    <Card className="flex h-full flex-col rounded-2xl border-black shadow-none dark:border-white">
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
                onClick={() => handleSubmit(emotion.id)}
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
