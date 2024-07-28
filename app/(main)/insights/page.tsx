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
import useSWRClient from '@hooks/useSWRClient';

import { Team, TeamDTO } from '@/types/TeamType';

// todo rename

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getHappinessInsightsByTeam } = useInsightsClient();
  const [happinessInsightData, setHappinessInsightData] = React.useState<HappinessInsightsChartDTO[]>();
  const [selectedTeam, setSelectedTeam] = React.useState<TeamDTO>();
  const { data, isLoading, error } = useSWRClient<Team[]>(`/v1/team/user/${user?.id}`);

  const fetchDashboardData = async (selectedTeamId: number) => {
    if (!user || !selectedTeam) return;
    try {
      const response = await getHappinessInsightsByTeam(selectedTeamId.toString(), user.id);
      setHappinessInsightData(response.data);
      // @ts-ignore
    } catch (authError) {
      toast({
        title: 'Error!',
        description: `Fetching problems with happiness insights `,
        variant: 'destructive',
      });
    }
  };

  React.useEffect(() => {
    setSelectedTeam(data ? data[0] : undefined); // default team 1 todo

    if (selectedTeam) {
      fetchDashboardData(selectedTeam.id).then((r) => r);
    }
  }, [user, selectedTeam]);
  //
  // const handleTeamChange = (team: Team) => {
  //   setSelectedTeam(team);
  // };

  return (
    <div className="space-y-4">
      {/* <Select value={selectedTeam? selectedTeam : undefined} onValueChange={handleTeamChange}> */}
      {/*   <SelectTrigger> */}
      {/*     <SelectContent> */}
      {/*       {data ? ( */}
      {/*         data.map((team) => ( */}
      {/*           <SelectItem key={team.id} value={team}> */}
      {/*             {team.name} */}
      {/*           </SelectItem> */}
      {/*         )) */}
      {/*       ) : ( */}
      {/*         <Loading /> */}
      {/*       )} */}
      {/*     </SelectContent> */}
      {/*   </SelectTrigger> */}
      {/* </Select> */}
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
