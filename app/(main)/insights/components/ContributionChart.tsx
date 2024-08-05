import * as React from 'react';
import { TotalContributionsPerDay } from '@/types/ContributionType';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@components/ui/Chart/Chart';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { HappinessInsightsDTO } from '@/types/InsightsType';
import CustomYAxisTick from '@/(main)/insights/components/CustomChartComponents/CustomYAxisTick';
import { toast } from 'sonner';
import { Siren } from 'lucide-react';
import fetchGitHubContributions from '@/(main)/insights/utils/fetchContributions';
import filterContributionsByDate from '@/(main)/insights/utils/filterContributionsByDate';

interface ContributionsInsightProps {
  happinessInsights?: HappinessInsightsDTO[];
  startDate: string; // Start date in 'YYYY-MM-DD' format
  endDate: string; // End date in 'YYYY-MM-DD' format
  githubUserName: string;
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

const ContributionChart: React.FC<ContributionsInsightProps> = ({
  happinessInsights,
  startDate,
  endDate,
  githubUserName,
}) => {
  const [contributionsPerDay, setContributionsPerDay] = React.useState<TotalContributionsPerDay[]>([]);
  const [userFound, setUserFound] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchAndFilterContributions = async () => {
      try {
        const allContributions = await fetchGitHubContributions(githubUserName);
        if (allContributions === null) {
          setUserFound(false);
        } else {
          setUserFound(true);
          const filteredContributions = filterContributionsByDate(allContributions, startDate, endDate);
          setContributionsPerDay(filteredContributions);
        }
      } catch (errorGithub) {
        toast.error('Unexpected error fetching happiness insights');
        setUserFound(false);
      }
    };
    fetchAndFilterContributions();
  }, [startDate, endDate, githubUserName]);

  const mergedData = contributionsPerDay.map((contribution) => {
    const happinessEntry = happinessInsights?.find((h) => h.day === contribution.date);
    return {
      date: contribution.date,
      contributionCount: contribution.contributionCount,
      userAverage: happinessEntry?.userAverage || 0,
    };
  });

  if (!userFound) {
    return (
      <Card className="group flex flex-col rounded-2xl border-none bg-primaryYellow-light shadow-none hover:bg-primaryYellow-main">
        <CardHeader className="flex flex-row">
          <div className="flex-1" />
          <div className="rounded-full bg-primaryYellow-main p-2 text-white group-hover:animate-icon-bounce group-hover:bg-white group-hover:text-primaryYellow-main">
            <Siren className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col justify-end">
          <div className="space-y-1 text-primaryYellow-main group-hover:text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl">Github Contributions</h1>

            <p className="md:text-md text-sm font-light">
              Please add a valid{' '}
              <a href="/settings" className="underline hover:underline">
                Github User
              </a>{' '}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userFound) {
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
  }
  return null;
};

export default ContributionChart;
