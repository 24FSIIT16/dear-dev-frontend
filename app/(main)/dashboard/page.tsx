import * as React from 'react';
import HappinessLineChart from './components/HappinessLineChart';
import WorkkindBarChart from './components/WorkkindBarChart';
import DaysTrackedRadialChart from './components/DaysTrackedRadialChart';
import WorkkindRadarChart from './components/WorkkindRadarChart';
import HappinessMonthlyBarChart from './components/HappinessMonthlyBarChart';

const DashboardPage: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-10">
      <HappinessMonthlyBarChart />
      <DaysTrackedRadialChart />
      <WorkkindRadarChart />
    </div>
    <div className="grid grid-cols-2 gap-10">
      <div>
        <HappinessLineChart />
      </div>
      <div>
        <WorkkindBarChart />
      </div>
    </div>
  </div>
);

export default DashboardPage;
