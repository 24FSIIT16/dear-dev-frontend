'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, LabelList, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/Chart/Chart';
import { WorkKindCountPerDayInsightDTO } from '@/types/InsightsType';
import CustomHorizontalBarChartLabel from '@/(main)/insights/components/CustomChartComponents/CustomHorizontalBarChartLabel';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';

const chartConfig = {
  userAverageHappiness: {
    label: 'Personal',
    color: '#D9F1E0',
  },
  teamAverageHappiness: {
    label: 'Team',
    color: '#F9D1D0',
  },
} satisfies ChartConfig;

interface InsightProps {
  workKindCountPerDayInsights?: WorkKindCountPerDayInsightDTO[];
}

const WorkkindCountPerDayBarChart: React.FC<InsightProps> = ({ workKindCountPerDayInsights }) => {
  const [visibleHorizontalBars, setVisibleHorizontalBars] = React.useState({
    userAverageHorizontalBar: true,
    teamAverageHorizontalBar: false,
  });

  const handleToggle = (line: keyof typeof visibleHorizontalBars) => {
    setVisibleHorizontalBars((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-none">
      <CardHeader>
        <CardTitle className="space-y-1">
          <p className="text-xl font-semibold">Influence of Switching Work Types</p>
          <p className="-mt-4 text-sm font-thin">Based on number of work types / day & overall happiness</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={workKindCountPerDayInsights}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} />

            <YAxis
              dataKey="workKindCount"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `n = ${value}`}
              hide={false}
            />
            <XAxis dataKey="userAverageHappiness" type="number" hide />

            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            {visibleHorizontalBars.userAverageHorizontalBar && (
              <Bar dataKey="userAverageHappiness" layout="vertical" fill="var(--color-userAverageHappiness)" radius={4}>
                <LabelList
                  dataKey="userAverageHappiness"
                  content={<CustomHorizontalBarChartLabel />}
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            )}
            {visibleHorizontalBars.teamAverageHorizontalBar && (
              <Bar dataKey="teamAverageHappiness" layout="vertical" fill="var(--color-teamAverageHappiness)" radius={4}>
                <LabelList
                  dataKey="teamAverageHappiness"
                  content={<CustomHorizontalBarChartLabel />}
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            )}

            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
        <div className="mt-8 flex space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleHorizontalBars.userAverageHorizontalBar}
              onCheckedChange={() => handleToggle('userAverageHorizontalBar')}
              id="personal4"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="personal4"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Personal
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleHorizontalBars.teamAverageHorizontalBar}
              onCheckedChange={() => handleToggle('teamAverageHorizontalBar')}
              id="team4"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="team4"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Team
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkkindCountPerDayBarChart;
