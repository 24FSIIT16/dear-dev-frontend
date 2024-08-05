// for GitHub Integration

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionCalendar {
  totalContributions: number;
  contributionDays: ContributionDay[];
}

export interface ApiResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: ContributionDay[];
          }[];
        };
      };
    };
  };
}

export interface TotalContributionsPerDay {
  date: string;
  contributionCount: number;
}

export interface RateLimitResponse {
  data: {
    rateLimit: {
      limit: number;
      cost: number;
      remaining: number;
      resetAt: string;
    };
  };
}
