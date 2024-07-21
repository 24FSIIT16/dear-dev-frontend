'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import { Textarea } from '@components/ui/Text/Textarea';

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
        <CardTitle className="space-x-2 text-sm font-medium">Survey</CardTitle>
        <CardTitle className="text-2xl font-bold">Give us some context about your day!</CardTitle>
        <CardDescription className="text-muted-foreground text-2lg">
          Your feedback is invaluable in helping us understand the positive and negative aspects of your workday. By
          sharing your experiences, you help us identify areas for improvement and celebrate the things that are working
          well. Please take a moment to provide your insights so we can create a better work environment for everyone.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="mb-4">
            <Label className="text-md space-x-2 font-medium">What was especially positive about it?</Label>
            <Textarea id="positiveFeedback" {...register('question3', { required: false })} />
            {errors.question3 && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <Label className="text-md space-x-2 font-medium">What was especially negative about it?</Label>
            <Textarea id="negativeFeedback" {...register('question4', { required: false })} />
            {errors.question4 && <span className="text-red-500">This field is required</span>}
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default FeedbackSurvey;
