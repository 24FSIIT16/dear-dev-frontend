import { HappinessInsightsChartDTO } from '@/types/InsightsType';

const convertToCSV = (objArray: HappinessInsightsChartDTO[]): string => {
  if (!Array.isArray(objArray) || objArray.length === 0) {
    return '';
  }

  const keys = Object.keys(objArray[0]);
  const header = keys.join(',');
  const csvRows = objArray.map((obj) => keys.map((key) => obj[key as keyof HappinessInsightsChartDTO]).join(','));

  return [header, ...csvRows].join('\r\n');
};

export default convertToCSV;
