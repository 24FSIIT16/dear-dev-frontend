'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import TaskPopover from '@components/Surveys/TaskPopover';
import getTodayDate from '@/lib/dateUtils';
import { Button } from '@components/ui/Buttons/Button';

type FormValues = {
  question2: Array<{ taskId: string; value: string }>;
};

const WorkKindSurvey: React.FC = () => {
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

  const handleSmilieChange = (taskId: string, value: string) => {
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
            <Label> {getTodayDate()}</Label>
            <div className="mt-2">
              <TaskPopover
                onSmilieChange={handleSmilieChange}
                tasks={[
                  { taskId: 'WK-1', buttonLabel: 'Coding' },
                  { taskId: 'WK-2', buttonLabel: 'Sprint Review' },
                  { taskId: 'WK-3', buttonLabel: 'Sprint Planning' },
                  { taskId: 'WK-4', buttonLabel: 'Call with Customer' },
                ]}
              />
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
