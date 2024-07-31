'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, LabelList } from 'recharts';
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/Chart/Chart';
import CustomBarChartLabel from '@/(main)/insights/components/CustomBarChartLabel';

const chartData = [
  { workkind: 'Design', teamAverage: 11, personalAverage: 8 },
  { workkind: 'Coding', teamAverage: 14, personalAverage: 12 },
  { workkind: 'Testing', teamAverage: 14, personalAverage: 10 },
  { workkind: 'Retro', teamAverage: 8, personalAverage: 6 },
  { workkind: 'Calls', teamAverage: 5, personalAverage: 17 },
];

const chartConfig = {
  personalAverage: {
    label: 'Personal',
    color: '#D9F1E0',
  },
  teamAverage: {
    label: 'Team',
    color: '#F9D1D0',
  },
} satisfies ChartConfig;

const WorkkindBarChart: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="space-y-1">
        <p className="text-xl font-semibold">Happiness per Type of Work </p>
        <p className="-mt-4 text-sm font-thin">Top 5 Workkinds</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="workkind" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

          <Bar dataKey="personalAverage" fill="var(--color-personalAverage)" radius={5}>
            <LabelList
              dataKey="personalAverage"
              content={<CustomBarChartLabel />}
              position="inside"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
          <Bar dataKey="teamAverage" fill="var(--color-teamAverage)" radius={5}>
            <LabelList
              dataKey="teamAverage"
              content={<CustomBarChartLabel />}
              position="inside"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </CardContent>
    {/* <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Coding is your favorite workkind</p>
          </div>
          <div className="flex items-center text-xs font-light">Showing Happiness-Score per workkind</div>
        </div>
      </div>
    </CardFooter> */}
  </Card>
);

export default WorkkindBarChart;
