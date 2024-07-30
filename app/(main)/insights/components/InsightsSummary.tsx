'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import * as React from 'react';
import { CalendarSearch, ChevronRight, CloudLightning, Laugh, RefreshCw, TrendingUp } from 'lucide-react';
import { Avatar } from '@components/ui/Avatar/Avatar';

export default function InsightsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-y-1">
          <p className="text-xl font-semibold">Your Personal Happiness Patterns</p>
          <p className="-mt-4 text-sm font-thin">
            Learn more, Recommendations, tips and tricks, what to keep doing etc....
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <TrendingUp />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-semibold leading-none">Your Happiness is 10% up last week</p>
            <p className="text-muted-foreground text-sm">You were quite busy and quite happy. Congrats!</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <Laugh />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-semibold leading-none">Coding makes you happy!</p>
            <p className="text-muted-foreground text-sm">After the Coding your happiness increases everytime!</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <RefreshCw />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-semibold leading-none">You are quite in sync with your team!</p>
            <p className="text-muted-foreground text-sm">
              Your personal happiness is quite in line with the one from the team
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <CalendarSearch />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-semibold leading-none">Watch out for some Meetings next week!</p>
            <p className="text-muted-foreground text-sm">Every day with more than 2 meetings is a bad day for you.</p>
          </div>
          <div className="text-sm text-primaryRed-main">
            <ChevronRight />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <CloudLightning />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-semibold leading-none">Try to stay focused on max. 2 Work types.</p>
            <p className="text-muted-foreground text-sm">Days with a lot of different work types make you unhappy.</p>
          </div>
          <div className="text-sm text-primaryRed-main">
            <ChevronRight />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
