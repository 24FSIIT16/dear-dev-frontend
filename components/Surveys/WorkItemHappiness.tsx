'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from '@components/ui/Toast/use-toast';
import Separator from '@components/ui/Separator/Separator';
import TaskPopover from '@components/Surveys/TaskPopover';

type FormValues = {
  question2: Array<{ taskId: string; value: string }>;
};

const WorkItemHappiness: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      question2: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'Success!',
      description: `Work Item Happiness  Submitted: ${JSON.stringify(data.question2)}`,
    });
    reset();
  };

  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardHeader>
        <CardTitle>Work Item Happiness </CardTitle>
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
                control={control}
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
        <CardFooter className="border-t px-6 py-4">
          <Button>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WorkItemHappiness;
