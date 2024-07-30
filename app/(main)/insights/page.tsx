'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useAuth } from '@providers/AuthProvider';
import useInsightsClient from '@hooks/useInsightsClient';
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
import Loading from '@components/Loading/Loading';
import { Button } from '@components/ui/Buttons/Button';
import { FileBarChart2, Printer } from 'lucide-react';
import convertToCSV from '@/(main)/insights/utils/downloadCSV';
import WorkkindRadarChart from '@/(main)/insights/components/WorkkindRadarChart';
import { InsightsDTO, HappinessInsightsDTO } from '@/types/InsightsType';
import WorkkindBarChart from './components/WorkkindBarChart';
import HappinessLineChart from './components/HappinessLineChart';

export interface Sprint {
  id: number;
  name: string;
  value: string;
  startDate: string;
  endDate: string;
}

const InsightsPage: React.FC = () => {
  const { user } = useAuth();
  const { getInsightsByTeam } = useInsightsClient();
  const [insightData, setInsightData] = React.useState<InsightsDTO>();
  const [happinessInsights, setHappinessInsights] = React.useState<HappinessInsightsDTO[]>([]);

  const { data } = useSWRClient<Team[]>(`/v1/team/user/${user?.id}`);

  const [selectedTeam, setSelectedTeam] = React.useState<Team>();
  const [sprint, setSprint] = React.useState<Sprint>();

  // todo get actual data
  const sprints: Sprint[] = [
    { id: 1, name: 'All Sprints', value: 'none', startDate: '2020-01-01', endDate: '2020-01-01' },
    { id: 2, name: 'Current Sprint', value: 'current', startDate: '2020-01-01', endDate: '2020-01-01' },
    { id: 3, name: 'Last Sprint', value: 'last', startDate: '2020-01-01', endDate: '2020-01-01' },
  ];

  const fetchInsights = async () => {
    if (!user) return;
    if (selectedTeam === undefined) return;
    if (sprint === undefined) return;
    try {
      const response = await getInsightsByTeam(user.id, selectedTeam.id, sprint.value);
      if (response) {
        setInsightData(response.data);
      }
    } catch (authError) {
      toast.error('Error fetching happiness insights');
    }
  };

  React.useEffect(() => {
    if (!selectedTeam) return;
    fetchInsights().then((r) => r);
  }, [selectedTeam, sprint]);

  React.useEffect(() => {
    if (!data) return;
    setSelectedTeam(data[0]);
    setSprint(sprints[0]);
  }, [data]);

  React.useEffect(() => {
    if (!insightData) return;
    setHappinessInsights(insightData.happinessInsights);
  }, [insightData]);

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

  const downloadCSV = (): void => {
    if (!insightData) return;
    const csv = convertToCSV(insightData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'happiness_insights.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="print-content">
      {user && selectedTeam && data && sprints ? (
        <div className="print-content space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select onValueChange={handleTeamChange} defaultValue={selectedTeam.name}>
              <SelectTrigger className="">
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
              <SelectTrigger>
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

            <div className="col-span-2 flex justify-end space-x-4">
              <Button size="icon" variant="outline" onClick={downloadCSV} className="no-print h-10 w-10">
                <FileBarChart2 className="w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={window.print} className="no-print h-10 w-10">
                <Printer className="w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-10">
            <HappinessLineChart happinessInsights={happinessInsights} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WorkkindBarChart />
            <WorkkindRadarChart />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WorkkindRadarChart />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default InsightsPage;
