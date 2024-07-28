/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';
import * as React from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { HappinessInsightsChartDTO } from '@/types/InsightsType';

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

// todo allow to set a daterange
// todo insert legend --- or icons to indicate happi - unhappy
const HappinessLineChart: React.FC<HappinessInsightProps> = ({ happinessInsights }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="space-y-1">
            <p className="text-xl font-semibold">Happiness - Personal vs. Team</p>
            {/* <p className="-mt-4 text-sm font-thin">Monday, 01.07.24 - Sunday, 07.07.24</p> */}
          </CardTitle>
        </div>
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
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
              angle={-20}
              dx={-5}
            />
            <YAxis />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line dataKey="userAverage" type="monotone" stroke={chartConfig.userAverage.color} dot={false} />
            <Line dataKey="teamAverage" type="monotone" stroke={chartConfig.teamAverage.color} dot={false} />
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
};

export default HappinessLineChart;
