import * as React from 'react';
import axios from 'axios';
import { ApiResponse, TotalContributionsPerDay } from '@/types/ContributionType';

const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const API_URL = 'https://api.github.com/graphql';

const ContributionChart: React.FC = () => {
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
    fetchCalendarData('smuefsmuef'); // Replace with the desired GitHub username
  }, []);

  return (
    <div>
      <h2>Total Contributions Per Day</h2>
      <ul>
        {contributionsPerDay.map((contribution) => (
          <li key={contribution.date}>
            Date: {contribution.date}, Contributions: {contribution.contributionCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributionChart;
