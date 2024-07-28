'use client';

import * as React from 'react';
import { toast } from '@components/ui/Toast/use-toast';
import { useAuth } from '@providers/AuthProvider';
import useInsightsClient from '@hooks/useInsightsClient';
import { HappinessInsightsChartDTO } from '@/types/InsightsType';
import HappinessLineChart from './components/HappinessLineChart';
import WorkkindBarChart from './components/WorkkindBarChart';
import useSWRClient from '@hooks/useSWRClient';

import { Team } from '@/types/TeamType';
import { Select, SelectContent, SelectItem } from '@components/ui/Select/Select';
import { SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import Loading from '@components/Loading/Loading';

// todo rename

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getHappinessInsightsByTeam } = useInsightsClient();
  const [happinessInsightData, setHappinessInsightData] = React.useState<HappinessInsightsChartDTO[]>();

  const { data, isLoading, error } = useSWRClient<Team[]>(`/v1/team/user/${user?.id}`);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>();
  const [sprint, setSprint] = React.useState<string>('none');

  const fetchDashboardData = async () => {
    if (!user) return;
    if (selectedTeam === undefined) return;
    try {
      const response = await getHappinessInsightsByTeam(user.id, selectedTeam.id, sprint);
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
    if (!selectedTeam) return;
    fetchDashboardData().then((r) => r);
  }, [selectedTeam, sprint]);

  React.useEffect(() => {
    if (!data) return;
    setSelectedTeam(data[0]);
  }, [data]);

  const handleTeamChange = (value: string) => {
    if (!data) return;
    const selected = data.find((team) => team.name === value);
    if (selected) {
      setSelectedTeam({
        active: false,
        code: '',
        configId: 0,
        createdAt: '',
        createdBy: 0,
        currentSprintId: 0,
        role: '',
        id: selected.id,
        name: selected.name,
      });
    }
  };

  const handleDateChange = (value: string) => {
    setSprint(value);
  };

  return (
    <div>
      {user && selectedTeam && data ? (
        <div className="space-y-4">
          <Select onValueChange={handleTeamChange} defaultValue={selectedTeam.name}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>My Teams</SelectLabel>
                {data.map((team) => (
                  <SelectItem key={team.id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleDateChange} defaultValue={sprint}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>My Teams</SelectLabel>
                <SelectItem key={1} value={'none'}>
                  All Sprints
                </SelectItem>
                <SelectItem key={1} value={'current'}>
                  Current Sprint
                </SelectItem>
                <SelectItem key={1} value={'last'}>
                  Last Sprint
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-3 gap-10">
            {/* <HappinessMonthlyBarChart /> */}
            {/* <DaysTrackedRadialChart /> */}
            {/* <WorkkindRadarChart /> */}
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DashboardPage;
