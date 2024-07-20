'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { User } from '@/types/UserType';
import { Emotion } from '@/types/EmotionType';

interface EmotionSurveyProps {
  emotions: Array<Emotion>;
  user: User;
  fetchDashboardData: () => void;
}

const EmotionSurvey: React.FC<EmotionSurveyProps> = ({ fetchDashboardData, emotions, user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-x-2 text-sm font-medium">Survey</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">How are you feeling?</div>
        <p className="text-muted-foreground text-s">sadasasd asd</p>

        {emotions.map((emotion) => emotion.name)}
      </CardContent>
    </Card>
  );
};

export default EmotionSurvey;
