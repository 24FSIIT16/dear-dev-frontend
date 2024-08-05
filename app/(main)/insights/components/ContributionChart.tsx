import * as React from 'react';
import axios from 'axios';
import { TotalContributionsPerDay } from '@/types/ContributionType';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@components/ui/Chart/Chart';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { HappinessInsightsDTO } from '@/types/InsightsType';
import CustomYAxisTick from '@/(main)/insights/components/CustomChartComponents/CustomYAxisTick';
import { fetchGitHubContributions } from '@/(main)/insights/utils/fetchContributions';
import { filterContributionsByDate } from '@/(main)/insights/utils/filterContributionsByDate';
import { toast } from 'sonner';

interface ContributionsInsightProps {
  happinessInsights?: HappinessInsightsDTO[];
  startDate: string; // Start date in 'YYYY-MM-DD' format
  endDate: string; // End date in 'YYYY-MM-DD' format
}

const chartConfig = {
  userAverage: {
    label: 'Personal Happiness',
    color: '#41B963',
  },
  contributionCount: {
    label: 'Contributions',
    color: 'rgba(78, 138, 227)',
  },
} satisfies ChartConfig;

const formatXAxis = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}`;
};

const ContributionChart: React.FC<ContributionsInsightProps> = ({ happinessInsights, startDate, endDate }) => {
  const [contributionsPerDay, setContributionsPerDay] = React.useState<TotalContributionsPerDay[]>([]);

  React.useEffect(() => {
    const fetchAndFilterContributions = async () => {
      try {
        const allContributions = await fetchGitHubContributions('smuefsmuef'); // Replace with desired GitHub username
        const filteredContributions = filterContributionsByDate(allContributions, startDate, endDate);
        setContributionsPerDay(filteredContributions);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error('Error fetching contribution data:', error.response.data.message || 'An error occurred');
        } else {
          toast.error('Unexpected error');
        }
      }
    };

    fetchAndFilterContributions();
  }, [startDate, endDate]);

  // Merge contributions and happiness data
  const mergedData = contributionsPerDay.map((contribution) => {
    const happinessEntry = happinessInsights?.find((h) => h.day === contribution.date);
    return {
      date: contribution.date,
      contributionCount: contribution.contributionCount,
      userAverage: happinessEntry?.userAverage || 0,
    };
  });

  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="space-y-1">
            <p className="text-xl font-semibold">Overall Happiness vs. Github Contributions</p>
            <p className="-mt-4 text-sm font-thin">
              Based on daily happiness values & Github activities such as commits, reviews, merge requests etc.)
            </p>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <LineChart
            accessibilityLayer
            data={mergedData}
            margin={{
              left: 0,
              right: 12,
              top: 5,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={13}
              angle={-20}
              dx={-5}
              tickFormatter={formatXAxis}
            />
            <YAxis
              tickMargin={45}
              tickLine={false}
              axisLine={false}
              domain={[0, 20]}
              ticks={[2, 20]}
              tick={CustomYAxisTick as never}
            />
            <ChartTooltip cursor />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
            <Line
              dataKey="userAverage"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.userAverage.color}
              dot={false}
              name={chartConfig.userAverage.label}
            />
            <Line
              dataKey="contributionCount"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.contributionCount.color}
              dot={false}
              name={chartConfig.contributionCount.label}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ContributionChart;
