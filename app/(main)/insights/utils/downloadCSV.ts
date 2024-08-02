import {
  InsightsDTO,
  HappinessInsightsDTO,
  WorkKindInsightsDTO,
  EmotionInsightsDTO,
  WorkKindCountPerDayInsightDTO,
} from '@/types/InsightsType';

const convertToCSV = (objArray: InsightsDTO): string => {
  if (!objArray) {
    return '';
  }

  const { happinessInsights, workKindInsights, emotionInsights, workKindCountPerDayInsights } = objArray;

  const convertArrayToCSV = <T extends object>(arr: T[]): string => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return '';
    }

    const keys = Object.keys(arr[0]) as Array<keyof T>;
    const header = keys.join(',');
    const csvRows = arr.map((obj) => keys.map((key) => (obj[key] !== undefined ? obj[key] : '')).join(','));

    return [header, ...csvRows].join('\r\n');
  };

  const happinessCSV = convertArrayToCSV<HappinessInsightsDTO>(happinessInsights);
  const workKindCSV = convertArrayToCSV<WorkKindInsightsDTO>(workKindInsights);
  const emotionCSV = convertArrayToCSV<EmotionInsightsDTO>(emotionInsights);
  const workKindCountPerDayCSV = convertArrayToCSV<WorkKindCountPerDayInsightDTO>(workKindCountPerDayInsights);

  return [happinessCSV, workKindCSV, emotionCSV, workKindCountPerDayCSV].filter(Boolean).join('\r\n\r\n');
};

export default convertToCSV;
