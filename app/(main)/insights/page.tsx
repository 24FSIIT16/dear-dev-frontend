'use client';

import * as React from 'react';
import { toast } from '@components/ui/Toast/use-toast';
import { useAuth } from '@providers/AuthProvider';
import useInsightsClient from '@hooks/useInsightsClient';
import { HappinessInsightsChartDTO } from '@/types/InsightsType';
import useSWRClient from '@hooks/useSWRClient';

import { Team } from '@/types/TeamType';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui/Select/Select';
import {} from '@radix-ui/react-select';
import Loading from '@components/Loading/Loading';
import { Button } from '@components/ui/Buttons/Button';
import { FileBarChart2, Printer } from 'lucide-react';
import WorkkindBarChart from './components/WorkkindBarChart';
import HappinessLineChart from './components/HappinessLineChart';

// todo add legend (team/personal)
// todo Add Export Function

export interface Sprint {
  id: number;
  name: string;
  value: string;
  startDate: string;
  endDate: string;
}

const InsightsPage: React.FC = () => {
  const { user } = useAuth();
  const { getHappinessInsightsByTeam } = useInsightsClient();
  const [happinessInsightData, setHappinessInsightData] = React.useState<HappinessInsightsChartDTO[]>();

  const { data } = useSWRClient<Team[]>(`/v1/team/user/${user?.id}`);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>();
  const [sprint, setSprint] = React.useState<Sprint>();

  const sprints: Sprint[] = [
    { id: 1, name: 'All Sprints', value: 'none', startDate: '2020-01-01', endDate: '2020-01-01' },
    { id: 2, name: 'Current Sprint', value: 'current', startDate: '2020-01-01', endDate: '2020-01-01' },
    { id: 1, name: 'Last Sprint', value: 'last', startDate: '2020-01-01', endDate: '2020-01-01' },
  ];

  const fetchDashboardData = async () => {
    if (!user) return;
    if (selectedTeam === undefined) return;
    if (sprint === undefined) return;
    try {
      const response = await getHappinessInsightsByTeam(user.id, selectedTeam.id, sprint.value);
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
    setSprint(sprints[0]);
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

  const handleSprintChange = (value: string) => {
    if (!sprints) return;
    const selectedSprint = sprints.find((selected) => selected.name === value);
    if (selectedSprint) {
      setSprint(selectedSprint);
    }
  };

  return (
    <div>
      {user && selectedTeam && data && sprints ? (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
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

            <Select onValueChange={handleSprintChange} defaultValue={sprint?.name}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sprints.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button size="sm" variant="outline" onClick={window.print}>
              <FileBarChart2 className="mr-2 h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export CSV</span>
            </Button>
            <Button size="sm" variant="outline" onClick={window.print}>
              <Printer className="mr-2 h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Print</span>
            </Button>
          </div>
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

export default InsightsPage;
