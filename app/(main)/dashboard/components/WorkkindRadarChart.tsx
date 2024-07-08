'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Card, CardContent, CardFooter } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/Chart/Chart';

const chartData = [
  { workkind: 'Desing', quantity: 186 },
  { workkind: 'Coding', quantity: 305 },
  { workkind: 'Testing', quantity: 237 },
  { workkind: 'Retro', quantity: 273 },
  { workkind: 'Planning', quantity: 209 },
  { workkind: 'Calls', quantity: 214 },
];

const chartConfig = {
  quantity: {
    label: 'Quantity',
    color: '#E94B68',
  },
} satisfies ChartConfig;

export default function WorkkindRadarChart() {
  return (
    <Card>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart
            data={chartData}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="workkind" />
            <PolarGrid />
            <Radar dataKey="quantity" fill="var(--color-quantity)" fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Trackings per workkind</p>
            </div>
            <div className="flex items-center text-xs font-light">Showing number of tracked workkinds this year</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
