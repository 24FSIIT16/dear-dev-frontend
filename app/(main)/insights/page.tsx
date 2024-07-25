'use client';

import * as React from 'react';
import { toast } from '@components/ui/Toast/use-toast';
import { useAuth } from '@providers/AuthProvider';
import useInsightsClient from '@hooks/useInsightsClient';
import { HappinessInsightsChartDTO } from '@/types/InsightsType';
import HappinessLineChart from './components/HappinessLineChart';
import WorkkindBarChart from './components/WorkkindBarChart';
import DaysTrackedRadialChart from './components/DaysTrackedRadialChart';
import WorkkindRadarChart from './components/WorkkindRadarChart';
import HappinessMonthlyBarChart from './components/HappinessMonthlyBarChart';

// todo rename
const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getHappinessTeamVsPersonal } = useInsightsClient();
  const [happinessInsightData, setHappinessInsightData] = React.useState<HappinessInsightsChartDTO[]>();

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const response = await getHappinessTeamVsPersonal(user.id);
      setHappinessInsightData(response.data);
    } catch (authError) {
      toast({
        title: 'Error!',
        description: `Fetching problems with happiness insights `,
        variant: 'destructive',
      });
    }
  };

  React.useEffect(() => {
    fetchDashboardData().then((r) => r);
  }, [user]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-10">
        <HappinessMonthlyBarChart />
        <DaysTrackedRadialChart />
        <WorkkindRadarChart />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <HappinessLineChart happinessInsights={happinessInsightData} />
        </div>
        <div>
          <WorkkindBarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
