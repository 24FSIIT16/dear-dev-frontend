'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';

type FormValues = {
  question1: string;
};

const OverallHappiness: React.FC = () => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      question1: '',
    },
  });

  const selectedValue = watch('question1');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'Success!',
      description: `Overall Happiness Survey Submitted: ${data.question1}`,
    });
    reset();
  };

  const handleChange = async (value: string) => {
    try {
      setValue('question1', value);
      await handleSubmit(onSubmit)();
    } catch (error) {
      console.error('Error handling change:', error);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How happy are you with your working day?</CardTitle>
        <CardDescription>
          Submit your overall happiness survey to track your happiness with your work day.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="mb-4">
            <Label> {getTodayDate()}</Label>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 pb-12 pt-12">
                {['5', '4', '2', '3', '6', '1'].map((value, index) => (
                  <SmiliesRadioButton
                    key={value}
                    value={value}
                    selectedValue={selectedValue}
                    size={130}
                    handleChange={handleChange}
                    altText={['Very Unhappy', 'Neutral', 'Happy', 'Very Happy', 'Very Happy', 'Very Unhappy'][index]}
                    imagePath={`/assets/Smilies/${['smily', 'shock', 'cry', 'sick', 'very-happy', 'angry'][index]}.png`}
                  />
                ))}
              </div>
            </div>
            {errors.question1 && <span className="text-red-500">This field is required</span>}
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default OverallHappiness;
