'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import { WorkKind } from '@/types/WorkKindType';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/Table/BasicTable';
import useDashboardClient from '@hooks/useDashboardClient';
import { SubmitWorkKindScoreDTO } from '@/types/SurveyType';
import { User } from '@/types/UserType';
import SurveyHappinessButton from '@components/Buttons/SurveyHappinessButton';

interface WorkKindSurveyProps {
  workKinds: Array<WorkKind>;
  user: User;
  fetchDashboardData: () => void;
}

const WorkKindSurvey: React.FC<WorkKindSurveyProps> = ({ fetchDashboardData, workKinds, user }) => {
  const { submitWorkKindScore } = useDashboardClient();

  const handleClick = async (score: number, workKindId: number) => {
    const workKindScore: SubmitWorkKindScoreDTO = {
      score,
      userId: user.id,
      workKindId,
    };

    try {
      await submitWorkKindScore(workKindScore);
      toast({
        title: 'Success!',
        description: `Happiness score submitted`,
      });
      fetchDashboardData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error!',
        description: `Failed to submit score: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-x-2 text-sm font-medium">Survey</CardTitle>
        <CardTitle className="text-2xl font-bold">How happy are you with specific worktypes?</CardTitle>
        <CardDescription className="text-muted-foreground text-2lg">
          We want to understand your satisfaction with the different types of work you do. Your feedback helps us
          improve and tailor tasks to better fit your preferences.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Work type</TableHead>
              <TableHead className="font-semibold">Happiness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workKinds.map((workKind) => (
              <TableRow key={workKind.id}>
                <TableCell className="font-light">{workKind.name}</TableCell>
                <TableCell className="font">
                  <div className="flex space-x-2">
                    <SurveyHappinessButton
                      score={2}
                      size="icon"
                      onClick={(score) => handleClick(score, workKind.id)}
                      className="bg-tertiaryBG-light"
                      icon={<Frown className="h-6 w-6" />}
                    />
                    <SurveyHappinessButton
                      score={8}
                      size="icon"
                      onClick={(score) => handleClick(score, workKind.id)}
                      className="bg-primaryRed-light text-primaryRed-main"
                      icon={<Annoyed className="h-6 w-6" />}
                    />
                    <SurveyHappinessButton
                      score={14}
                      size="icon"
                      onClick={(score) => handleClick(score, workKind.id)}
                      className="bg-primaryBlue-light text-primaryBlue-main"
                      icon={<Smile className="h-6 w-6" />}
                    />
                    <SurveyHappinessButton
                      score={20}
                      size="icon"
                      onClick={(score) => handleClick(score, workKind.id)}
                      className="bg-primaryGreen-light text-primaryGreen-main"
                      icon={<Laugh className="h-6 w-6" />}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WorkKindSurvey;
