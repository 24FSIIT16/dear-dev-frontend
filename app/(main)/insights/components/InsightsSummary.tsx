'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import * as React from 'react';
import { CalendarSearch, CloudLightning, Laugh, RefreshCw, TrendingUp } from 'lucide-react';
import { Avatar } from '@components/ui/Avatar/Avatar';

export default function InsightsSummary() {
  return (
    <Card className="rounded-2xl border-none bg-primaryBlue-light shadow-none hover:bg-primaryBlue-main">
      <CardHeader>
        <CardTitle className="space-y-1">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold">Your Happiness Patterns</p>
            <span className="text-sm font-thin text-primaryBlue-main">(Demo)</span>
          </div>
          <p className="-mt-4 text-sm font-thin">
            Discover key insights into your happiness, with recommendations and tips to maintain and improve your
            well-being.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {/* Positive Trends */}
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-7 w-7 sm:flex">
            <TrendingUp />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Happiness Increased by 10% Last Week</p>
            <p className="text-muted-foreground text-sm">You managed a busy schedule while staying happy. Great job!</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-7 w-7 sm:flex">
            <Laugh />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Coding Brings You Joy</p>
            <p className="text-muted-foreground text-sm">
              Each coding session noticeably boosts your happiness levels.
            </p>
          </div>
        </div>

        {/* Team Dynamics */}
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-7 w-7 sm:flex">
            <RefreshCw />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Aligned with Your Team</p>
            <p className="text-muted-foreground text-sm">
              Your personal happiness trends align closely with your team&apos;s mood.
            </p>
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-7 w-7 sm:flex">
            <CalendarSearch />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Beware of Overloaded Meeting Days</p>
            <p className="text-muted-foreground text-sm">
              Days with more than two meetings tend to lower your happiness.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-7 w-7 sm:flex">
            <CloudLightning />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Focus on Fewer Work Types</p>
            <p className="text-muted-foreground text-sm">
              Juggling more than two types of tasks in a day negatively impacts your mood.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
