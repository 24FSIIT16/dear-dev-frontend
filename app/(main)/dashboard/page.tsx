import * as React from 'react';
import HappinessLineChart from './components/HappinessLineChart';
import WorkkindBarChart from './components/WorkkindBarChart';

const DashboardPage: React.FC = () => (
  <div className="grid grid-cols-2 gap-10">
    <div>
      <WorkkindBarChart />
    </div>
    <div>
      <HappinessLineChart />
    </div>
  </div>
);

export default DashboardPage;
