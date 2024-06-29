'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from '@components/ui/Toast/use-toast';
import { Textarea } from '@components/ui/Text/Textarea';
import getTodayDate from '../../services/dateService';

type FormValues = {
  question3: string;
  question4: string;
};

const FeedbackSurvey: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      question3: '',
      question4: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'Success!',
      description: `Feedback Survey Submitted: Positive - ${data.question3}, Negative - ${data.question4}`,
    });
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Give us some context about your day!</CardTitle>
        <CardDescription>
          Submit your feedback to provide positive and negative aspects of your work day.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Label>{getTodayDate()}</Label>

          <div className="mb-4">
            <Label>What was especially positive about it?</Label>
            <Textarea id="positiveFeedback" {...register('question3', { required: false })} />
            {errors.question3 && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <Label>What was especially negative about it?</Label>
            <Textarea id="negativeFeedback" {...register('question4', { required: false })} />
            {errors.question4 && <span className="text-red-500">This field is required</span>}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="w-full">Submit </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackSurvey;
