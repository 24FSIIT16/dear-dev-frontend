import axios from 'axios';
import { ApiResponse, TotalContributionsPerDay } from '@/types/ContributionType';
import { toast } from 'sonner';

const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const API_URL = 'https://api.github.com/graphql';

/**
 * Fetches GitHub contributions for a specified username.
 *
 * @param username - The GitHub username.
 * @returns A promise that resolves to an array of contributions per day.
 */
const fetchGitHubContributions = async (username: string): Promise<TotalContributionsPerDay[] | null> => {
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
  try {
    const response = await axios.post<ApiResponse>(
      API_URL,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const { user } = response.data.data;

    if (!user) {
      return null;
    }

    const { contributionCalendar } = user.contributionsCollection;

    // Flatten the contributions data
    return contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: day.contributionCount,
      }))
    );
  } catch (error) {
    toast.error('Error fetching contributions:');
    return null;
  }
};

export default fetchGitHubContributions;
