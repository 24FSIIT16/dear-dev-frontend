/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';
import * as React from 'react';
import { Line, LineChart, XAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

const chartData = [
  { day: 'Monday', personal: 4, team: 5 },
  { day: 'Tuesday', personal: 3, team: 4 },
  { day: 'Wednesday', personal: 5, team: 3 },
  { day: 'Thursday', personal: 4, team: 4 },
  { day: 'Friday', personal: 5, team: 5 },
  { day: 'Saturday', personal: 3, team: 4 },
  { day: 'Sunday', personal: 4, team: 4 },
];

const chartConfig = {
  personal: {
    label: 'Personal',
    color: '#41B963',
  },
  team: {
    label: 'Team',
    color: '#E94B68',
  },
} satisfies ChartConfig;

const HappinessLineChart: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="space-y-1">
        <p className="text-xl font-semibold">Happiness - Personal vs. Team</p>
        <p className="-mt-4 text-sm font-thin">Monday, 01.07.24 - Firday, 05.07.24</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
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
