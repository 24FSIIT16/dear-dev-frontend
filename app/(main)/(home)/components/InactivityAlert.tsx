'use client';

import * as React from 'react';

import { DashboardDTO } from '@/types/DashboardType';
import Widget from '@components/Cards/Widget';
import { Megaphone } from 'lucide-react';

interface DashboardOverviewProps {
  dashboardData?: DashboardDTO;
}

const InactivityAlert: React.FC<DashboardOverviewProps> = ({ dashboardData }) => (
  <div>
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
