'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import { Button } from '@components/ui/Buttons/Button';
import { WorkKind } from '@/types/WorkKindType';
import { Annoyed, Frown, Laugh, PlusCircle, Smile } from 'lucide-react';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/Table/BasicTable';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/ToggleGroup/ToggleGroup';
import useSurveyClient from '@hooks/useSurveyClient';
import { SubmitWorkKindScoreDTO } from '@/types/SurveyType';
import { User } from '@/types/UserType';

interface WorkKindSurveyProps {
  workKinds: Array<WorkKind>;
  user: User;
}

const WorkKindSurvey: React.FC<WorkKindSurveyProps> = ({ workKinds, user }) => {
  const { submitWorkKindScore } = useSurveyClient();

  const handleToggle = async (value: number, workKindId: number) => {
    const workKindScore: SubmitWorkKindScoreDTO = {
      score: value,
      userId: user.id,
      workKindId,
    };

    try {
      await submitWorkKindScore(workKindScore);
      toast({
        title: 'Success!',
        description: `Happiness score submitted`,
      });
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
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">How happy are you with the specific work kinds?</div>
        <p className="text-muted-foreground text-s">
          Submit your happiness for specific work kinds to track your happiness with different kind of tasks.
        </p>

        <Table className={'mt-5'}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Workkind</TableHead>
              <TableHead className="w-[100px]">Happiness</TableHead>
            </TableRow>
          </TableHeader>
          <TableRow>
            <TableCell className="font-semibold">asdasd</TableCell>
            <TableCell className="font">
              <ToggleGroup type="single" defaultValue="s" variant={'outline'}>
                <ToggleGroupItem value="2" onClick={() => handleToggle(2, 1)}>
                  <Frown className={'bg-tertiaryBG-light'} />
                </ToggleGroupItem>
                <ToggleGroupItem value="8" onClick={() => handleToggle(8, 1)}>
                  <Annoyed />
                </ToggleGroupItem>
                <ToggleGroupItem value="14" onClick={() => handleToggle(8, 1)}>
                  <Smile />
                </ToggleGroupItem>
                <ToggleGroupItem value="20" onClick={() => handleToggle(8, 1)}>
                  <Laugh />
                </ToggleGroupItem>
              </ToggleGroup>
            </TableCell>
          </TableRow>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Workkind
        </Button>
      </CardFooter>
    </Card>
  );

  // <Card>
  //   <CardHeader>
  //     <CardTitle>?</CardTitle>
  //     <CardDescription>
  //       Submit your happiness for specific work kinds to track your happiness with different kind of tasks.
  //     </CardDescription>
  //   </CardHeader>

  {
    /*  <form onSubmit={handleSubmit(onSubmit)}>*/
  }
  {
    /*    <CardContent>*/
  }
  {
    /*      <div className="mb-4">*/
  }
  {
    /*        <div className="mt-2">*/
  }
  {
    /*          <TaskPopover onSmilieChange={handleSmilieChange} workKinds={workKinds} />*/
  }
  {
    /*          <Button className="h-8" type="button">*/
  }
  {
    /*            New Workkind*/
  }
  {
    /*          </Button>*/
  }
  {
    /*        </div>*/
  }
  {
    /*        {errors.question2 && <span className="text-red-500">This field is required</span>}*/
  }
  {
    /*      </div>*/
  }
  {
    /*    </CardContent>*/
  }
  {
    /*  </form>*/
  }
  {
    /*</Card>*/
  }
};

export default WorkKindSurvey;
