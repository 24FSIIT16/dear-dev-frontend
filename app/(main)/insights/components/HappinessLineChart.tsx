'use client';

import { Card, CardTitle, CardHeader, CardContent } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@components/ui/Chart/Chart';
import * as React from 'react';
import { Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts';
import CustomYAxisTick from '@/(main)/insights/components/CustomChartComponents/CustomYAxisTick';
import { HappinessInsightsDTO } from '@/types/InsightsType';
import CustomToolTip from '@/(main)/insights/components/CustomChartComponents/CustomToolTip';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';

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
  userAverageHappiness?: number;
  teamAverageHappiness?: number;
}

const HappinessLineChart: React.FC<HappinessInsightProps> = ({
  happinessInsights,
  userAverageHappiness,
  teamAverageHappiness,
}) => {
  const alertLines = happinessInsights
    ? happinessInsights
        .map((point, index) => {
          const nextPoint = happinessInsights[index + 1];
          if (nextPoint && point.teamAverage !== 0 && Math.abs(point.userAverage - point.teamAverage) > 8) {
            return {
              x: point.day,
              y1: point.userAverage,
              y2: point.teamAverage,
              key: `${point.day}-${index}`,
            };
          }
          return null;
        })
        .filter((line) => line !== null)
    : [];

  const [visibleLines, setVisibleLines] = React.useState({
    userAverage: true,
    teamAverage: true,
    userAverageLine: true,
    teamAverageLine: false,
    alertLines: false,
  });

  const handleToggle = (line: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="space-y-1">
            <p className="text-xl font-semibold">Overall Happiness - Team vs. Personal</p>
            <p className="-mt-4 text-sm font-thin">Based on daily happiness values</p>
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
            {visibleLines.userAverageLine && (
              <ReferenceLine y={userAverageHappiness} stroke="#D9F1E0" strokeWidth={2} />
            )}

            {visibleLines.teamAverageLine && (
              <ReferenceLine y={teamAverageHappiness} stroke="#F9D1D0" strokeWidth={2} />
            )}
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={13}
              tickFormatter={formatXAxis}
              angle={-20}
              dx={-5}
            />
            <YAxis
              tickMargin={45}
              tickLine={false}
              axisLine={false}
              tick={CustomYAxisTick as never}
              ticks={[2, 20]}
              domain={[0, 20]}
            />

            <ChartTooltip cursor content={<CustomToolTip />} />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />

            <Line
              dataKey="userAverage"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.userAverage.color}
              dot={false}
            />
            <Line
              dataKey="teamAverage"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.teamAverage.color}
              dot={false}
            />

            {visibleLines.alertLines &&
              alertLines.map((line) => (
                <ReferenceLine
                  key={line.key}
                  x={line.x}
                  y1={line.y1}
                  y2={line.y2}
                  stroke="rgba(255, 179, 0)"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
              ))}
          </LineChart>
        </ChartContainer>
        <div className="mt-8 flex space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleLines.userAverageLine}
              onCheckedChange={() => handleToggle('userAverageLine')}
              id="personal"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="personal"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Personal Average
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleLines.teamAverageLine}
              onCheckedChange={() => handleToggle('teamAverageLine')}
              id="team"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="team"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Team Average
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={visibleLines.alertLines}
              onCheckedChange={() => handleToggle('alertLines')}
              id="alerts"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="alerts"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Alerts
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HappinessLineChart;
