'use client';

import * as React from 'react';

import { DashboardDTO } from '@/types/DashboardType';
import Widget from '@components/Cards/Widget';
import { AudioWaveform, Bike, CircleSlash, Shapes } from 'lucide-react';
import Progress from '@components/ui/Progress/Progress';
import AverageHappinessButton from '@components/Buttons/AverageHappinessButton';

interface DashboardOverviewProps {
  dashboardData?: DashboardDTO;
}

const WidgetRow: React.FC<DashboardOverviewProps> = ({ dashboardData }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Widget
      header={{
        title: 'Average Happiness',
        icon: <CircleSlash />,
      }}
      content={{
        mainContent: <AverageHappinessButton score={dashboardData?.averageScore ?? 0} />,
      }}
    />
    <Widget
      header={{
        title: 'Current Sprint',
        icon: <Bike />,
      }}
      content={{
        mainContent: <Progress value={85} aria-label="12% increase" />,
        subContent: '4 days left',
      }}
    />
    <Widget
      header={{
        title: 'Most tracked Emotions',
        icon: <AudioWaveform />,
      }}
      content={{
        mainContent: <div> Bored, Lonely, Sick</div>,
      }}
    />
    <Widget
      header={{
        title: 'Most Tracked Worktype',
        icon: <Shapes />,
      }}
      content={{
        mainContent: dashboardData?.mostVotedWorkKind ? dashboardData?.mostVotedWorkKind?.workKindName : '-',
        subContent: 'tracked 37 times, Happiness :(',
      }}
    />
  </div>
);

export default WidgetRow;