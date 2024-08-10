'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useAuth } from '@providers/AuthProvider';
import useInsightsClient from '@hooks/useInsightsClient';
import useSWRClient from '@hooks/useSWRClient';
import Error from '@components/Error/Error';

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
import { TeamWithSprintsDTO } from '@/types/TeamConfigType';
import { SprintDTO } from '@/types/SprintType';
import WorkkindBarChart from './components/WorkkindBarChart';
import HappinessLineChart from './components/HappinessLineChart';

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
  const [selectedTeam, setSelectedTeam] = React.useState<TeamWithSprintsDTO | null>(null);
  const [currentUser, setcurrentUser] = React.useState<User | null>(null);
  const [selectedSprint, setSelectedSprint] = React.useState<SprintDTO | null>(null);

  const { data: userData, isLoading: isLoadingUserData, error } = useSWRClient<User>(`/v1/user/${user?.id}`);
  const {
    data: teamWithSprints,
    isLoading: isLoadingTeamWithSprints,
    error: errorLoadingTeamWithSprints,
  } = useSWRClient<TeamWithSprintsDTO[]>(`/v1/team/user/${user?.id}/sprints`);

  const defaultSprint: SprintDTO = {
    id: 0,
    sprintName: 'All-Time',
    sprintGoal: 'All data',
    startDate: '1970-01-01',
    endDate: '2099-12-31',
    status: 'ALL',
  };

  const fetchInsights = async () => {
    if (!user || !selectedTeam) return;
    const sprintId = selectedSprint ? selectedSprint.id : 0;
    try {
      const response = await getInsightsByTeamAndSprint(user.id, selectedTeam.id, sprintId);
      if (response) {
        setInsightData(response.data);
      }
    } catch (authError) {
      toast.error('Error fetching happiness insights');
    }
  };

  React.useEffect(() => {
    if (userData) {
      setcurrentUser(userData);
    }
    fetchInsights();
  }, [selectedTeam, selectedSprint, userData]);

  React.useEffect(() => {
    if (teamWithSprints && teamWithSprints.length > 0) {
      setSelectedTeam(teamWithSprints[0]);
      setSelectedSprint(defaultSprint);
    }
  }, [teamWithSprints]);

  React.useEffect(() => {
    if (!insightData) return;
    setHappinessInsights(insightData.happinessInsights);
    setWorkKindInsights(insightData.workKindInsights);
    setEmotionInsights(insightData.emotionInsights);
    setWorkKindCountPerDayInsights(insightData.workKindCountPerDayInsights);
  }, [insightData]);

  const handleTeamChange = (value: string) => {
    const selected = teamWithSprints?.find((team) => team.name === value);
    if (selected) {
      setSelectedTeam(selected);
      setSelectedSprint(defaultSprint);
    }
  };

  const handleSprintChange = (value: string) => {
    if (!selectedTeam) return;
    const sprint = selectedTeam.sprints.find((s) => s.sprintName === value);
    if (sprint) {
      setSelectedSprint(sprint);
    } else if (value === defaultSprint.sprintName) {
      setSelectedSprint(defaultSprint);
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

  if (isLoadingTeamWithSprints || isLoadingUserData || !user || !teamWithSprints) return <Loading />;
  if (error || errorLoadingTeamWithSprints)
    return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

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
                  {teamWithSprints.map((team) => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={handleSprintChange} defaultValue={defaultSprint.sprintName}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key={defaultSprint.id} value={defaultSprint.sprintName}>
                    {defaultSprint.sprintName}
                  </SelectItem>
                  {selectedTeam.sprints.map((sprint) => (
                    <SelectItem key={sprint.id} value={sprint.sprintName}>
                      {sprint.sprintName}
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
              startDate={selectedSprint ? selectedSprint.startDate : '2024-01-01'}
              endDate={selectedSprint ? selectedSprint.endDate : '2024-12-31'}
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
