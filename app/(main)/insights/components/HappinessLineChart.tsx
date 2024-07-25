/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';
import * as React from 'react';
import { Line, LineChart, XAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { HappinessInsightsChartDTO } from '@/types/InsightsType';

// const chartData = [
//   { day: '2024-12-01', userAverage: 4, teamAverage: 5 },
//   { day: '2024-12-02', userAverage: 3, teamAverage: 4 },
//   { day: '2024-12-03', userAverage: 5, teamAverage: 3 },
//   { day: '2024-12-05', userAverage: 4, teamAverage: 4 },
//   { day: '2024-12-06', userAverage: 5, teamAverage: 5 },
//   { day: '2024-12-07', userAverage: 3, teamAverage: 4 },
//   { day: '2024-12-08', userAverage: 4, teamAverage: 4 },
// ];

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

interface HappinessInsightProps {
  happinessInsights?: HappinessInsightsChartDTO[];
}

const HappinessLineChart: React.FC<HappinessInsightProps> = ({ happinessInsights }) => (
  <Card>
    <CardHeader>
      <CardTitle className="space-y-1">
        <p className="text-xl font-semibold">Happiness - Personal vs. Team</p>
        <p className="-mt-4 text-sm font-thin">Monday, 01.07.24 - Sunday, 07.07.24</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={happinessInsights}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line dataKey="personal" type="monotone" stroke="var(--color-personal)" dot={false} />
          <Line dataKey="team" type="monotone" stroke="var(--color-team)" dot={false} />
        </LineChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <p className="font-semibold">Your Happiness is 10% up last week</p>
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="flex items-center text-xs font-light">Showing Happiness-Score over the last week</div>
        </div>
      </div>
    </CardFooter>
  </Card>
);

export default HappinessLineChart;
