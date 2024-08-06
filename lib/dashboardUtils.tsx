import * as React from 'react';
import { differenceInDays, format, parseISO } from 'date-fns';
import { Frown, Annoyed, Smile, Laugh } from 'lucide-react';

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

export const getIconBasedOnScore = (averageScore: number | null) => {
  if (!averageScore) return null;

  if (averageScore <= 5) {
    return <Frown className="h-16 w-16 group-hover:animate-spin" />;
  }
  if (averageScore <= 11) {
    return <Annoyed className="h-16 w-16 group-hover:animate-spin" />;
  }
  if (averageScore <= 17) {
    return <Smile className="h-16 w-16 group-hover:animate-spin" />;
  }
  return <Laugh className="h-16 w-16 group-hover:animate-spin" />;
};
