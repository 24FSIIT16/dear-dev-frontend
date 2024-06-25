'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from '@components/ui/Toast/use-toast';
import { Textarea } from '@components/ui/Text/Textarea';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';
import TaskPopover from '@components/Surveys/TaskPopover';

type FormValues = {
  question1: string;
  question2: Array<{ taskId: string; value: string }>;
  question3: string;
  question4: string;
};

const DailyHappinessSurvey: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      question1: '',
      question2: [],
      question3: '',
      question4: '',
    },
  });

  const selectedValue = watch('question1');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'Success!',
      description: `Survey Submitted with response: ${JSON.stringify(data.question2)}  ${data.question1} ${data.question3} ${data.question4}`,
    });
    reset();
  };

  const handleChange = (value: string) => {
    setValue('question1', value);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString();
  };

  return (
    <Card x-chunk="dashboard-04-chunk-1 ">
      <CardHeader>
        <CardTitle>Happiness Survey {getTodayDate()}</CardTitle>
        <CardDescription>
          Submit your daily happiness survey to track your happiness with your work day.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="mb-4">
            <Label>How happy are you with your overall working day?</Label>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 pb-12 pt-12">
                {['5', '4', '2', '3', '6', '1'].map((value, index) => (
                  <SmiliesRadioButton
                    key={value}
                    value={value}
                    selectedValue={selectedValue}
                    size={18}
                    handleChange={handleChange}
                    altText={['Very Unhappy', 'Neutral', 'Happy', 'Very Happy', 'Very Happy', 'Very Unhappy'][index]}
                    imagePath={`/assets/Smilies/${['smily', 'shock', 'cry', 'sick', 'very-happy', 'angry'][index]}.png`}
                  />
                ))}
              </div>
            </div>

            {errors.question1 && <span className="text-red-500">This field is required</span>}
          </div>

          <hr className="my-6 border-t-2 border-gray-200" />

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
            {errors.question2 && <span>This field is required</span>}
          </div>

          <hr className="my-6 border-t-2 border-gray-200" />

          <div className="mb-4">
            <Label>What was especially positive about it?</Label>
            <Textarea id="lastName" {...register('question3', { required: false })} />
            {errors.question3 && <span>This field is required</span>}
          </div>
          <div className="mb-4">
            <Label>What was especially negative about it?</Label>
            <Textarea id="lastName" {...register('question4', { required: false })} />
            {errors.question4 && <span>This field is required</span>}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DailyHappinessSurvey;
