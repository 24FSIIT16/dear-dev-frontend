'use client';

import * as React from 'react';

import { DashboardDTO } from '@/types/DashboardType';
import Widget from '@components/Cards/Widget';
import { Activity, Annoyed, Bike, CircleSlash2, Component, Megaphone, Siren } from 'lucide-react';
import AlertWidget from './AlertWidget';
import Widget2 from './Widget';
import SprintWidget from './SprintWidget';

interface DashboardOverviewProps {
  dashboardData?: DashboardDTO;
}

const InactivityAlert: React.FC<DashboardOverviewProps> = ({ dashboardData }) => (
  <div className="space-y-4">
    <AlertWidget icon={<Siren className="h-5 w-5" />} days={12} />
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-2 row-span-2 grid">
        <Widget2 icon={<Component className="h-5 w-5" />} content="Coding" description="Most tracked worktype" />
      </div>
      <Widget2
        icon={<CircleSlash2 className="h-5 w-5" />}
        content={<Annoyed className="h-16 w-16" />}
        description="Average Happiness"
      />
      <Widget2 icon={<Activity className="h-5 w-5" />} content="Bored, Lonely" description="Most tracked emotions" />
      <SprintWidget icon={<Bike className="h-5 w-5" />} content="4" description="Days left in the sprint" />
      <Widget2 icon={<Component className="h-5 w-5" />} content="Coding" description="Most tracked worktype" />
    </div>
    <AlertWidget icon={<Siren className="h-5 w-5" />} days={12} />
    <Widget
      header={{
        title: 'We think you forgot something?!',
        icon: <Megaphone />,
      }}
      content={{
        mainContent: 'No Happiness tracking since 52 days.',
        subContent: dashboardData?.averageScore,
      }}
      borderColor="border-primaryBlue-main"
      fontColor="text-primaryBlue-main"
    />
  </div>
);

export default InactivityAlert;
