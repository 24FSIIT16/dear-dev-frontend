/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis } from 'recharts';
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';

const chartData = [
  { workkind: 'Design', happiness: 3.2 },
  { workkind: 'Coding', happiness: 5.5 },
  { workkind: 'Testing', happiness: 3.4 },
  { workkind: 'Retro', happiness: 4.1 },
  { workkind: 'Planning', happiness: 2.6 },
  { workkind: 'Calls', happiness: 4.9 },
];

const chartConfig = {
  happiness: {
    label: 'Average:',
    color: '#D9F1E0',
  },
} satisfies ChartConfig;

const WorkkindBarChart: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="space-y-1">
        <p className="text-xl font-semibold">Workkinds - Happiness Average</p>
        <p className="-mt-4 text-sm font-thin">Across All Time</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="workkind" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="happiness" fill="var(--color-happiness)" radius={5} />
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <p className="font-semibold">Coding is your favorite workkind</p>
          </div>
          <div className="flex items-center text-xs font-light">Showing Happiness-Score over the last week</div>
        </div>
      </div>
    </CardFooter>
  </Card>
);

export default WorkkindBarChart;
