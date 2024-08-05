import * as React from 'react';
import axios from 'axios';
import { ApiResponse, TotalContributionsPerDay } from '@/types/ContributionType';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@components/ui/Chart/Chart';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { HappinessInsightsDTO } from '@/types/InsightsType';
import CustomYAxisTick from '@/(main)/insights/components/CustomChartComponents/CustomYAxisTick';

const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const API_URL = 'https://api.github.com/graphql';

interface HappinessInsightProps {
  happinessInsights?: HappinessInsightsDTO[];
  userAverageHappiness?: number;
  teamAverageHappiness?: number;
}

const chartConfig = {
  contributionCount: {
    label: 'Contributions',
    color: 'rgba(78, 138, 227)',
  },
  userAverage: {
    label: 'Personal Happiness',
    color: '#41B963',
  },
} satisfies ChartConfig;

const ContributionChart: React.FC<HappinessInsightProps> = ({ happinessInsights }) => {
  const [contributionsPerDay, setContributionsPerDay] = React.useState<TotalContributionsPerDay[]>([]);

  const fetchCalendarData = async (username: string): Promise<void> => {
    try {
      const query = `
        query($userName: String!) { 
          user(login: $userName){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        userName: username,
      };

      const response = await axios.post<ApiResponse>(
        API_URL,
        {
          query,
          variables,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      const { contributionCalendar } = response.data.data.user.contributionsCollection;

      // Transform and filter the data
      const totalContributionsPerDay: TotalContributionsPerDay[] = [];

      contributionCalendar.weeks.forEach((week) => {
        week.contributionDays.forEach((day) => {
          if (day.contributionCount > 0) {
            totalContributionsPerDay.push({
              date: day.date,
              contributionCount: day.contributionCount,
            });
          }
        });
      });
      setContributionsPerDay(totalContributionsPerDay); // todo check
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error response
        const errorMessage = error.response.data.message || 'An error occurred';
        console.error('Error fetching contribution data:', errorMessage);

        // // Check rate limit if unauthorized
        // if (error.response.status === 401) {
        //   await checkRateLimit();
        // }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  // const checkRateLimit = async () => {
  //   try {
  //     const query = `
  //       query {
  //         rateLimit {
  //           limit
  //           cost
  //           remaining
  //           resetAt
  //         }
  //       }
  //     `;
  //
  //     const response = await axios.post<RateLimitResponse>(
  //       API_URL,
  //       { query },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${TOKEN}`,
  //         },
  //       }
  //     );
  //
  //     const { rateLimit } = response.data.data;
  //     console.error('Rate Limit Status:', rateLimit);
  //   } catch (error) {
  //     console.error('Error checking rate limit:', error);
  //   }
  // };

  // Fetch data when component mounts
  React.useEffect(() => {
    fetchCalendarData('smuefsmuef').then((r) => console.log('r', r)); // Replace with the desired GitHub username
  }, []);

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
            <p className="text-xl font-semibold">Overall Happiness vs. Code Contributions</p>
            <p className="-mt-4 text-sm font-thin">Based on daily happiness values & Github Activity</p>
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
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={13} angle={-20} dx={-5} />
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
              dataKey="contributionCount"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.contributionCount.color}
              dot={false}
              name={chartConfig.contributionCount.label}
            />
            <Line
              dataKey="userAverage"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.userAverage.color}
              dot={false}
              name={chartConfig.userAverage.label}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ContributionChart;
