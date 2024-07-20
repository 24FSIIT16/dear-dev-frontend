'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import TaskPopover from '@components/Surveys/TaskPopover';
import getTodayDate from '@/lib/dateUtils';
import { Button } from '@components/ui/Buttons/Button';
import { AverageScoreResponse } from '@/types/SurveyType';
import { WorkKind } from '@/types/WorkKindType';

type FormValues = {
  question2: Array<{ taskId: number; value: string }>;
};

interface WorkKindSurveyProps {
  workKinds: Array<WorkKind>;
}

const WorkKindSurvey: React.FC<WorkKindSurveyProps> = ({ workKinds }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      question2: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'Success!',
      description: `Work Kind Happiness Submitted: ${JSON.stringify(data.question2)}`,
    });
    reset();
  };

  const handleSmilieChange = (taskId: number, value: string) => {
    const currentValues = getValues('question2') || [];
    const newValues = [...currentValues.filter((item) => item.taskId !== taskId), { taskId, value }];
    setValue('question2', newValues);
    handleSubmit(onSubmit)().catch((error) => console.error('Error submitting form:', error));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How happy are you with the specific work kinds?</CardTitle>
        <CardDescription>
          Submit your happiness for specific work kinds to track your happiness with different kind of tasks.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="mb-4">
            <div className="mt-2">
              <TaskPopover onSmilieChange={handleSmilieChange} workKinds={workKinds} />
              <Button className="h-8" type="button">
                New Workkind
              </Button>
            </div>
            {errors.question2 && <span className="text-red-500">This field is required</span>}
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default WorkKindSurvey;
