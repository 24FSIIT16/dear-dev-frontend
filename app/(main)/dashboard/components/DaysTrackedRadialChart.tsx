/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardFooter } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer } from '@components/ui/Chart/Chart';

const chartData = [{ happiness: 'total', days: 86, fill: '#B8D0F4' }];

const chartConfig = {
  days: {
    label: 'Days',
  },
  happiness: {
    label: 'Total',
    color: '#B8D0F4',
  },
} satisfies ChartConfig;

function DaysTrackedRadialChart() {
  return (
    <Card>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} startAngle={0} endAngle={86} innerRadius={80} outerRadius={110}>
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
              className="first:fill-muted last:fill-background"
            />
            <RadialBar dataKey="days" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="text-4xl font-bold">
                          {chartData[0].days.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-black">
                          Days
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Days with tracked Happiness</p>
            </div>
            <div className="flex items-center text-xs font-light">Showing number of days this year</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default DaysTrackedRadialChart;
