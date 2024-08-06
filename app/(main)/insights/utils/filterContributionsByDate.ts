import { TotalContributionsPerDay } from '@/types/ContributionType';

/**
 * Filters contributions data by a specified date range.
 *
 * @param contributions - The array of contributions per day.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns A filtered array of contributions within the specified date range.
 */
const filterContributionsByDate = (
  contributions: TotalContributionsPerDay[],
  startDate: string,
  endDate: string
): TotalContributionsPerDay[] =>
  contributions.filter((day) => day.contributionCount > 0 && day.date >= startDate && day.date <= endDate);
export default filterContributionsByDate;
