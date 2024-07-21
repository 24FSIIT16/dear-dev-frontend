'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { User } from '@/types/UserType';
import { Emotion } from '@/types/EmotionType';
import { Badge } from '@components/ui/Badge/Badge';
import { toast } from '@components/ui/Toast/use-toast';
import useDashboardClient from '@hooks/useDashboardClient';

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
    <Card>
      <CardHeader>
        <CardTitle className="space-x-2 text-sm font-medium">Survey</CardTitle>
        <CardTitle className="text-2xl font-bold">How do you feel?</CardTitle>
        <CardDescription className="text-muted-foreground text-2lg">
          We value your well-being and would love to know how you feel today. Please select the emotion that best
          represents your current mood. Your feedback helps us understand your overall happiness and track changes over
          time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mt-4 flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <Badge
              key={emotion.id}
              variant="secondary"
              onClick={() => handleClick(emotion.id)}
              className="cursor-pointer p-4 text-sm transition-colors duration-200 ease-in-out hover:bg-primaryBlue-main"
            >
              {emotion.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionSurvey;
