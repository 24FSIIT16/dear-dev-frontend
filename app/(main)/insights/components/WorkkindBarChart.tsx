'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, LabelList, YAxis } from 'recharts';
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@components/ui/Chart/Chart';
import CustomBarChartLabel from '@/(main)/insights/components/CustomChartComponents/CustomBarChartLabel';
import { WorkKindInsightsDTO } from '@/types/InsightsType';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import CustomToolTip from '@/(main)/insights/components/CustomChartComponents/CustomToolTip';
import truncateString from '@/lib/stringUtils';

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

const WorkkindBarChart: React.FC<InsightProps> = ({ workKindInsights }) => {
  const [visibleBars, setVisibleBars] = React.useState({
    userAverageBar: true,
    teamAverageBar: true,
  });

  const handleToggle = (line: keyof typeof visibleBars) => {
    setVisibleBars((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-y-1">
          <p className="text-xl font-semibold">Happiness per Type of Work </p>
          <p className="-mt-4 text-sm font-thin">Top 5 of collected work types</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={workKindInsights} className="ml-0">
            <XAxis
              dataKey="workKindName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => truncateString(value, 10)}
            />
            <YAxis
              width={0}
              domain={[0, 'dataMax + 4']}
              tickLine={false}
              axisLine={false}
              tick={false}
              className="ml-0"
            />
            <ChartTooltip cursor={false} content={<CustomToolTip />} />
            {visibleBars.userAverageBar && (
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
            )}
            {visibleBars.teamAverageBar && (
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
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
        <div className="mt-8 flex space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleBars.userAverageBar}
              onCheckedChange={() => handleToggle('userAverageBar')}
              id="personal2"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="personal2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Personal Average
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleBars.teamAverageBar}
              onCheckedChange={() => handleToggle('teamAverageBar')}
              id="team2"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="team2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Team Average
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkkindBarChart;
