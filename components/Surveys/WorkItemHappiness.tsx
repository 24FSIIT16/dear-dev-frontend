'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import TaskPopover from '@components/Surveys/TaskPopover';
import getTodayDate from '@/lib/dateUtils';
import { useEffect, useState } from 'react';
import WorkItemClient from '@/api/workItemClient';

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
    handleSubmit(onSubmit)().catch((error) =>
      toast({
        title: 'Error!',
        description: `Error submitting, error: ${error}, ${getTodayDate()}`,
      })
    );
  };

  const [workItems, setWorkItems] = useState<string[]>([]);
  useEffect(() => {
    WorkItemClient.getWorkItems()
      .then((response) => {
        setWorkItems(response?.data?.message);
        toast({
          title: 'Success!',
          description: `Work Items Fetched: ${JSON.stringify(response?.data?.message)}`,
        });
      })
      .catch((error) => {
        toast({
          title: 'Error!',
          description: `Error getting workItems, error: ${error}, ${getTodayDate()}`,
        });
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>How happy are you with the specific work items?</CardTitle>
        <CardDescription>
          Submit your happiness for specific work items to track your happiness with your tasks.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="mb-4">
            <Label> {getTodayDate()}</Label>
            <Label> {workItems.find((item) => item)}</Label>
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
        </CardContent>
      </form>
    </Card>
  );
};

export default WorkItemHappiness;
