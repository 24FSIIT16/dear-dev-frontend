'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, LabelList, YAxis } from 'recharts';
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/Chart/Chart';
import CustomBarChartLabel from '@/(main)/insights/components/CustomChartComponents/CustomBarChartLabel';
import { WorkKindInsightsDTO } from '@/types/InsightsType';

const chartConfig = {
  userAverage: {
    label: 'Personal',
    color: '#D9F1E0',
  },
  teamAverage: {
    label: 'Team',
    color: '#F9D1D0',
  },
} satisfies ChartConfig;

interface InsightProps {
  workKindInsights?: WorkKindInsightsDTO[];
}

const WorkkindBarChart: React.FC<InsightProps> = ({ workKindInsights }) => (
  <Card>
    <CardHeader>
      <CardTitle className="space-y-1">
        <p className="text-xl font-semibold">Happiness per Type of Work </p>
        <p className="-mt-4 text-sm font-thin">Top 5 Workkinds</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={workKindInsights} className="ml-0">
          <XAxis dataKey="workKindName" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis
            width={0}
            domain={[0, 'dataMax + 4']}
            tickLine={false}
            axisLine={false}
            tick={false}
            className="ml-0"
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="userAverage" fill="var(--color-userAverage)" radius={5}>
            <LabelList
              dataKey="userAverage"
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
