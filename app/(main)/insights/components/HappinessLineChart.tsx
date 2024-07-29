/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@components/ui/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/Chart/Chart';
import * as React from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import CustomYAxisTick from '@/(main)/insights/components/CustomYAxisTick';
import { HappinessInsightsDTO } from '@/types/InsightsType';

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

const formatXAxis = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}`;
};

interface HappinessInsightProps {
  happinessInsights?: HappinessInsightsDTO[];
}

const HappinessLineChart: React.FC<HappinessInsightProps> = ({ happinessInsights }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="space-y-1">
          <p className="text-xl font-semibold">Happiness - Team vs. Personal</p>
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className="h-52 w-full">
        <LineChart
          accessibilityLayer
          data={happinessInsights}
          margin={{
            left: 0,
            right: 12,
            top: 5,
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={13}
            tickFormatter={formatXAxis}
            angle={-20}
            dx={-5}
          />
          <YAxis tickMargin={45} tickLine axisLine={false} tick={CustomYAxisTick as never} />
          <ChartTooltip cursor content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
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

export default HappinessLineChart;
