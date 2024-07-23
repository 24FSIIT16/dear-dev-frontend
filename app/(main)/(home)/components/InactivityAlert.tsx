'use client';

import * as React from 'react';

import { DashboardDTO } from '@/types/DashboardType';
import Widget from '@components/Cards/Widget';
import { Megaphone, Siren } from 'lucide-react';
import AlertWidget from './AlertWidget';

interface DashboardOverviewProps {
  dashboardData?: DashboardDTO;
}

const InactivityAlert: React.FC<DashboardOverviewProps> = ({ dashboardData }) => (
  <div className="space-y-4">
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
