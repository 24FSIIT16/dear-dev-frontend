import { differenceInDays, format, parseISO } from 'date-fns';

export const calculateDaysWithoutHappiness = (lastDate: string) => {
  if (!lastDate) return 0;

  const parsedDate = parseISO(lastDate);
  const today = new Date();
  return differenceInDays(today, parsedDate);
};

export const calculateDaysLeftInSprint = (endDate: string) => {
  if (!endDate) return 0;

  const parsedDate = parseISO(endDate);
  const today = new Date();
  return differenceInDays(parsedDate, today);
};

export const joinEmotions = (emotionsArray: string[]) => {
  if (!emotionsArray) return '';

  return emotionsArray.join(', ');
};

export const formatSprintEndDate = (date: string | undefined) => {
  if (!date) return '';

  const parsedDate = parseISO(date);
  return format(parsedDate, 'MM / dd / yyyy');
};
