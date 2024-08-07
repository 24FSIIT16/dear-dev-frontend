'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card/Card';
import * as React from 'react';
import { CalendarSearch, CloudLightning, Laugh, RefreshCw, TrendingUp } from 'lucide-react';

export default function InsightsSummary() {
  return (
    <Card className="group rounded-2xl border-none bg-primaryBlue-light text-primaryBlue-main shadow-none hover:bg-primaryBlue-main hover:text-white">
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
        <div className="flex items-center gap-4">
          <div className="hidden rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main sm:flex">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="grid gap-1 group-hover:text-white">
            <p className="text-md font-semibold leading-none">Happiness Increased by 10% Last Week</p>
            <p className="text-muted-foreground text-sm">You managed a busy schedule while staying happy. Great job!</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main sm:block">
            <Laugh className="h-5 w-5" />
          </div>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Coding Brings You Joy</p>
            <p className="text-muted-foreground text-sm">
              Each coding session noticeably boosts your happiness levels.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main sm:flex">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Aligned with Your Team</p>
            <p className="text-muted-foreground text-sm">
              Your personal happiness trends align closely with your team&apos;s mood.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main sm:flex">
            <CalendarSearch className="h-5 w-5" />
          </div>
          <div className="grid gap-1">
            <p className="text-md font-semibold leading-none">Beware of Overloaded Meeting Days</p>
            <p className="text-muted-foreground text-sm">
              Days with more than two meetings tend to lower your happiness.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main sm:flex">
            <CloudLightning className="h-5 w-5" />
          </div>
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
