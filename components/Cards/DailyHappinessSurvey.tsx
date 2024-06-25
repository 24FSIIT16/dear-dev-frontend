'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from '@components/ui/Label/Label';
import { Input } from '@components/ui/Input/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from '@components/ui/Toast/use-toast';
import { Textarea } from '@components/ui/Text/Textarea';

type FormValues = {
  question1: string;
  question2: string; // will contain object or numbers
  question3: string;
  question4: string;
};

const DailyHappinessSurvey: React.FC = () => {
  const {
    register,
    watch: watch,
    setValue: setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const selectedValue = watch('question1');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // console.log(data);
    // incl- timestamp & user id
    toast({
      title: 'Success!',
      description: `Survey Submitted ${data.question1}`,
    });
    reset(); // Reset form values after submission
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
            <div className="mb-2 grid grid-cols-3 gap-4">
              <Label className="cursor-pointer">
                <Input
                  type="radio"
                  value="5"
                  {...register('question1', { required: true })}
                  className="hidden"
                  onChange={() => handleChange('5')}
                />
                <img
                  src="/assets/Smilies/smily.png"
                  alt="Very Unhappy"
                  className={`h-12 w-12 ${selectedValue === '5' ? '' : 'grayscale'} hover:grayscale-0`}
                />
              </Label>
              <Label className="cursor-pointer">
                <Input
                  type="radio"
                  value="4"
                  {...register('question1', { required: true })}
                  className="hidden"
                  onChange={() => handleChange('4')}
                />
                <img
                  src="/assets/Smilies/shock.png"
                  alt="Neutral"
                  className={`h-12 w-12 ${selectedValue === '4' ? '' : 'grayscale'} hover:grayscale-0`}
                />
              </Label>
              <Label className="cursor-pointer">
                <Input
                  type="radio"
                  value="2"
                  {...register('question1', { required: true })}
                  className="hidden"
                  onChange={() => handleChange('2')}
                />
                <img
                  src="/assets/Smilies/cry.png"
                  alt="Happy"
                  className={`h-12 w-12 ${selectedValue === '2' ? '' : 'grayscale'} hover:grayscale-0`}
                />
              </Label>
              <Label className="cursor-pointer">
                <Input
                  type="radio"
                  value="3"
                  {...register('question1', { required: true })}
                  className="hidden"
                  onChange={() => handleChange('3')}
                />
                <img
                  src="/assets/Smilies/sick.png"
                  alt="Very Happy"
                  className={`h-12 w-12 ${selectedValue === '3' ? '' : 'grayscale'} hover:grayscale-0`}
                />
              </Label>
              <Label className="cursor-pointer">
                <Input
                  type="radio"
                  value="6"
                  {...register('question1', { required: true })}
                  className="hidden"
                  onChange={() => handleChange('6')}
                />
                <img
                  src="/assets/Smilies/very-happy.png"
                  alt="Very Happy"
                  className={`h-12 w-12 ${selectedValue === '6' ? '' : 'grayscale'} hover:grayscale-0`}
                />
              </Label>
              <Label className="cursor-pointer">
                <Input
                  type="radio"
                  value="1"
                  {...register('question1', { required: true })}
                  className="hidden"
                  onChange={() => handleChange('1')}
                />
                <img
                  src="/assets/Smilies/angry.png"
                  alt="Very Happy"
                  className={`h-12 w-12 ${selectedValue === '1' ? '' : 'grayscale'} hover:grayscale-0`}
                />
              </Label>
            </div>
            {errors.question1 && <span className="text-red-500">This field is required</span>}
          </div>

          <hr className="my-6 border-t-2 border-gray-200" />

          <div className="mb-4">
            <Label>How happy are you with the specific work items?</Label>
            <Input id="lastName" {...register('question2', { required: false })} />
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
