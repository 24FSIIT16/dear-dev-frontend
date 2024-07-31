'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';
import * as React from 'react';

const chartData = [
  { emotion: 'Angry', userAverage: 11, teamAverage: 18 },
  { emotion: 'Relaxed', userAverage: 12, teamAverage: 15 },
  { emotion: 'Tired', userAverage: 13, teamAverage: 10 },
  { emotion: 'Stressed', userAverage: 2, teamAverage: 18 },
  { emotion: 'Hungry', userAverage: 13, teamAverage: 13 },
];

const chartConfig = {
  userAverage: {
    label: 'Personal',
    color: '#41B963',
  },
  teamAverage: {
    label: 'Team',
    color: '#E94B68',
  },
} satisfies ChartConfig;

export default function EmotionRadarChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="space-y-1">
            <p className="text-xl font-semibold">Emotions - Personal vs. team</p>
            <p className="-mt-4 text-sm font-thin">Top 5 Emotions</p>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart
            data={chartData}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="emotion" />
            <PolarGrid />
            <Radar dataKey="userAverage" fill="var(--color-userAverage)" fillOpacity={0.4} />
            <Radar dataKey="teamAverage" fill="var(--color-teamAverage)" fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
