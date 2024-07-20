import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/Card/Card';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@components/ui/Chart/Chart';

const MostTrackedWorkKindChart: React.FC = () => (
  <ChartContainer
    config={{
      move: {
        label: 'Meetings',
        color: 'hsl(var(--chart-1))',
      },
      stand: {
        label: 'Coding',
        color: 'hsl(var(--chart-2))',
      },
      exercise: {
        label: 'Workshops',
        color: 'hsl(var(--chart-3))',
      },
    }}
    className="h-[140px] w-full"
  >
    <BarChart
      margin={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      }}
      data={[
        {
          activity: 'Meetings',
          value: 63,
          label: '63',
          fill: 'var(--color-stand)',
        },
        {
          activity: 'Coding',
          value: 42,
          label: '42',
          fill: 'var(--color-exercise)',
        },
        {
          activity: 'Calls',
          value: 33,
          label: '33',
          fill: 'var(--color-move)',
        },
      ]}
      layout="vertical"
      barSize={32}
      barGap={2}
    >
      <XAxis type="number" dataKey="value" hide />
      <YAxis
        dataKey="activity"
        type="category"
        tickLine={false}
        tickMargin={4}
        axisLine={false}
        className="capitalize"
      />
      <Bar dataKey="value" radius={5}>
        <LabelList position="insideLeft" dataKey="label" fill="white" offset={8} fontSize={12} />
      </Bar>
    </BarChart>
  </ChartContainer>
);

export default MostTrackedWorkKindChart;
