/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import { Card, CardContent, CardFooter } from '@components/ui/Card/Card';
import { ChartContainer, ChartConfig } from '@components/ui/Chart/Chart';
import * as React from 'react';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'March', happiness: 3.4 },
  { month: 'April', happiness: 4.1 },
  { month: 'May', happiness: 2.6 },
  { month: 'June', happiness: 4.4 },
  { month: 'July', happiness: 4.9 },
];

const chartConfig = {
  happiness: {
    label: 'Happiness-Score',
    color: '#B8D0F4',
  },
  label: {
    color: '#000',
  },
} satisfies ChartConfig;

const HappinessMonthlyBarChart: React.FC = () => (
  <Card>
    <CardContent className="pb-0">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            right: 16,
            bottom: 20,
            top: 16,
          }}
        >
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="happiness" type="number" hide />
          <Bar dataKey="happiness" layout="vertical" fill="var(--color-happiness)" radius={4}>
            <LabelList
              dataKey="month"
              position="insideLeft"
              offset={8}
              className="fill-[--color-label]"
              fontSize={12}
            />
            <LabelList dataKey="happiness" position="right" offset={8} className="fill-foreground" fontSize={12} />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Monthly Happiness-Score</p>
          </div>
          <div className="flex items-center text-xs font-light">Showing Happiness-Score on a monthly base</div>
        </div>
      </div>
    </CardFooter>
  </Card>
);

export default HappinessMonthlyBarChart;
