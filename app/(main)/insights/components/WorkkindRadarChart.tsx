'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';
import * as React from 'react';

const chartData = [
  { workkind: 'Desing', userAverage: 18, teamAverage: 8 },
  { workkind: 'Coding', userAverage: 12, teamAverage: 15 },
  { workkind: 'Testing', userAverage: 3, teamAverage: 10 },
  { workkind: 'asd', userAverage: 20, teamAverage: 10 },
  { workkind: 'sdfsdfsdf', userAverage: 3, teamAverage: 13 },
  { workkind: 'asdfsdfdfsdsd', userAverage: 3, teamAverage: 6 },
  { workkind: 'sd', userAverage: 13, teamAverage: 10 },
  { workkind: 'rt', userAverage: 3, teamAverage: 11 },
  { workkind: 'Retro', userAverage: 14, teamAverage: 15 },
  { workkind: 'Planning', userAverage: 14, teamAverage: 11 },
  { workkind: 'fs', userAverage: 8, teamAverage: 10 },
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

export default function WorkkindRadarChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="space-y-1">
            <p className="text-xl font-semibold">Velocity / Sprint irgendwas.. oder textalanlyse - Personal vs. team</p>
            <p>... oder anzahl von worktypes an einzennen tagen und die entsprehcende happiness</p>
            <p>... average number of workkinds on a happy day, and on a unhappy day..</p>
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
            <PolarAngleAxis dataKey="workkind" />
            <PolarGrid />
            <Radar dataKey="userAverage" fill="var(--color-userAverage)" fillOpacity={0.4} />
            <Radar dataKey="teamAverage" fill="var(--color-teamAverage)" fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
