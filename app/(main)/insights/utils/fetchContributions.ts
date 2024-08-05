import axios from 'axios';
import { ApiResponse, TotalContributionsPerDay } from '@/types/ContributionType';

const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const API_URL = 'https://api.github.com/graphql';

/**
 * Fetches GitHub contributions for a specified username.
 *
 * @param username - The GitHub username.
 * @returns A promise that resolves to an array of contributions per day.
 */
export const fetchGitHubContributions = async (username: string): Promise<TotalContributionsPerDay[]> => {
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

  const variables = { userName: username };

  const response = await axios.post<ApiResponse>(
    API_URL,
    { query, variables },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  const { contributionCalendar } = response.data.data.user.contributionsCollection;

  // Flatten the contributions data
  return contributionCalendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      contributionCount: day.contributionCount,
    }))
  );
};
