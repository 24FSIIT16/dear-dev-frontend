'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useAuth } from '@providers/AuthProvider';
import useInsightsClient from '@hooks/useInsightsClient';
import useSWRClient from '@hooks/useSWRClient';
import Error from '@components/Error/Error';

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
import {
  InsightsDTO,
  HappinessInsightsDTO,
  WorkKindInsightsDTO,
  EmotionInsightsDTO,
  WorkKindCountPerDayInsightDTO,
} from '@/types/InsightsType';
import InsightsSummary from '@/(main)/insights/components/InsightsSummary';
import EmotionRadarChart from '@/(main)/insights/components/EmotionRadarChart';
import WorkkindCountPerDayBarChart from '@/(main)/insights/components/WorkkindCountPerDayBarChart';
import ContributionChart from '@/(main)/insights/components/ContributionChart';
import { User } from '@/types/UserType';
import WorkkindBarChart from './components/WorkkindBarChart';
import HappinessLineChart from './components/HappinessLineChart';

export interface Sprint {
  id: string;
  name: string;
  value: string;
  startDate: string;
  endDate: string;
}

const InsightsPage: React.FC = () => {
  const { user } = useAuth();
  const { getInsightsByTeamAndSprint } = useInsightsClient();
  const [insightData, setInsightData] = React.useState<InsightsDTO>();
  const [happinessInsights, setHappinessInsights] = React.useState<HappinessInsightsDTO[]>([]);
  const [workKindInsights, setWorkKindInsights] = React.useState<WorkKindInsightsDTO[]>([]);
  const [emotionInsights, setEmotionInsights] = React.useState<EmotionInsightsDTO[]>([]);
  const [workKindCountPerDayInsights, setWorkKindCountPerDayInsights] = React.useState<WorkKindCountPerDayInsightDTO[]>(
    []
  );

  const { data: teamData, isLoading, error } = useSWRClient<Team[]>(`/v1/team/user/${user?.id}`);
  const { data: userData, isLoading: isLoadingUserData } = useSWRClient<User>(`/v1/user/${user?.id}`);

  const [selectedTeam, setSelectedTeam] = React.useState<Team>();
  const [currentUser, setcurrentUser] = React.useState<User>();
  const [sprint, setSprint] = React.useState<Sprint>();

  // todo get actual data & type it
  const sprints: Sprint[] = [
    { id: '0', name: 'All-Time', value: 'none', startDate: '2020-01-01', endDate: '2020-01-01' },
    { id: '1', name: 'one Sprint', value: 'current', startDate: '2020-01-01', endDate: '2020-01-01' },
    { id: '2', name: 'two asdasdSprint', value: 'last', startDate: '2020-01-01', endDate: '2020-01-01' },
  ];

  const fetchInsights = async () => {
    if (!user) return;
    if (selectedTeam === undefined) return;
    if (sprint === undefined) return;
    try {
      const response = await getInsightsByTeamAndSprint(user.id, selectedTeam.id, sprint.id);
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
    if (!userData) return;
    setcurrentUser(userData);
  }, [userData]);

  React.useEffect(() => {
    if (!teamData) return;
    setSelectedTeam(teamData[0]);
    setSprint(sprints[0]);
  }, [teamData]);

  React.useEffect(() => {
    if (!insightData) return;
    setHappinessInsights(insightData.happinessInsights);
    setWorkKindInsights(insightData.workKindInsights);
    setEmotionInsights(insightData.emotionInsights);
    setWorkKindCountPerDayInsights(insightData.workKindCountPerDayInsights);
  }, [insightData]);

  const handleTeamChange = (value: string) => {
    if (!teamData) return;
    const selected = teamData.find((team) => team.name === value);
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

  const handlePrint = () => {
    window.print();
  };

  if (isLoading || isLoadingUserData || !user || !selectedTeam || !teamData || !sprints) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div className="print-content">
      {selectedTeam ? (
        <div className="print-content space-y-4">
          <div className="grid flex-grow grid-cols-4 items-center gap-4">
            <Select onValueChange={handleTeamChange} defaultValue={selectedTeam.name}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>My Teams</SelectLabel>
                  {teamData.map((team) => (
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
              <Button size="icon" variant="outline" onClick={handlePrint} className="no-print h-10 w-10">
                <Printer className="w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-10">
            <HappinessLineChart
              happinessInsights={happinessInsights}
              teamAverageHappiness={insightData ? insightData.teamAverageHappiness : 0.0}
              userAverageHappiness={insightData ? insightData.userAverageHappiness : 0.0}
            />
          </div>
          <div className="grid gap-10">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <WorkkindBarChart workKindInsights={workKindInsights} />
              <InsightsSummary />
            </div>
            <ContributionChart
              happinessInsights={happinessInsights}
              githubUserName={currentUser ? currentUser.githubUserName : ''}
              startDate="2024-06-01"
              endDate="2024-09-01"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <EmotionRadarChart emotionInsights={emotionInsights} />
            <WorkkindCountPerDayBarChart workKindCountPerDayInsights={workKindCountPerDayInsights} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default InsightsPage;
