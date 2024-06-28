'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import Separator from '@components/ui/Separator/Separator';
import TaskPopover from '@components/Surveys/TaskPopover';

type FormValues = {
  question2: Array<{ taskId: string; value: string }>;
};

const WorkItemHappiness: React.FC = () => {
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
      description: `Work Item Happiness Submitted: ${JSON.stringify(data.question2)}`,
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
        <CardTitle>Work Item Happiness</CardTitle>
        <CardDescription>
          Submit your happiness for specific work items to track your happiness with your tasks.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="mb-4">
            <Label>How happy are you with the specific work items?</Label>
            <div className="mt-2">
              <TaskPopover
                onSmilieChange={handleSmilieChange}
                tasks={[
                  { taskId: 'DEAR-90', buttonLabel: 'DEAR-90 Create Basic...' },
                  { taskId: 'MEET-12', buttonLabel: 'Meeting Client LIPO' },
                  { taskId: 'DEAR-91', buttonLabel: 'DEAR-91 Update Advanced...' },
                ]}
              />
            </div>
            {errors.question2 && <span className="text-red-500">This field is required</span>}
          </div>

          <Separator />
        </CardContent>
      </form>
    </Card>
  );
};

export default WorkItemHappiness;
