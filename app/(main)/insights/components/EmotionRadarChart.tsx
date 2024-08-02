'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/Chart/Chart';
import * as React from 'react';
import { EmotionInsightsDTO } from '@/types/InsightsType';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import truncateString from '@/lib/stringUtils';

const chartConfig = {
  userCount: {
    label: 'Personal',
    color: '#41B963',
  },
  teamCount: {
    label: 'Team',
    color: '#E94B68',
  },
} satisfies ChartConfig;

interface InsightProps {
  emotionInsights?: EmotionInsightsDTO[];
}

const EmotionRadarChart: React.FC<InsightProps> = ({ emotionInsights }) => {
  const [visibleAreas, setVisibleAreas] = React.useState({
    userCountArea: true,
    teamCountArea: true,
  });

  const handleToggle = (line: keyof typeof visibleAreas) => {
    setVisibleAreas((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="space-y-1">
            <p className="text-xl font-semibold">Emotions - Personal vs. Team</p>
            <p className="-mt-4 text-sm font-thin">10 most tracked emotions</p>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto">
          {visibleAreas.userCountArea || visibleAreas.teamCountArea ? (
            <RadarChart
              data={emotionInsights}
              margin={{
                left: 0,
                right: 0,
              }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="emotionName" tickFormatter={(value: string) => truncateString(value, 30)} />
              <PolarGrid />
              {visibleAreas.userCountArea && (
                <Radar dataKey="userCount" fill="var(--color-userCount)" fillOpacity={0.2} />
              )}
              {visibleAreas.teamCountArea && (
                <Radar dataKey="teamCount" fill="var(--color-teamCount)" fillOpacity={0.2} />
              )}
              <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
          ) : (
            <div />
          )}
        </ChartContainer>
        <div className="mt-8 flex space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleAreas.userCountArea}
              onCheckedChange={() => handleToggle('userCountArea')}
              id="personal3"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="personal3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Personal Average
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleAreas.teamCountArea}
              onCheckedChange={() => handleToggle('teamCountArea')}
              id="team3"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="team3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Team Average
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionRadarChart;
