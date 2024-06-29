'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Label from '@components/ui/Label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card/Card';
import { toast } from '@components/ui/Toast/use-toast';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';
import getTodayDate from '@/lib/dateUtils';

type FormValues = {
  question1: string;
};

const OverallHappiness: React.FC = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      question1: '',
    },
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [randomGif, setRandomGif] = React.useState<string | null>(null);

  const gifUrls = [
    'https://media.giphy.com/media/11oNXSmmBzNLA4/giphy.gif?cid=ecf05e474o12q9h24ceio3i36zhcxlar1q4xki0tqlh7g2pz&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2JqM201NHcyYm52d3d2eXl1ZHdpYzVzdXgyOHFkeWF5bWpwenVwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yoJC2GnSClbPOkV0eA/giphy.gif',
    'https://media.giphy.com/media/10FwycrnAkpshW/giphy.gif?cid=790b761194bph79kow9cj0q110zhbrux3q811kx6uqb9h5lz&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  ];

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'Success!',
      description: `Overall Happiness Survey Submitted: ${data.question1}, ${getTodayDate()}`,
    });
    setRandomGif(gifUrls[Math.floor(Math.random() * gifUrls.length)]);
    setSubmitted(true);
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

  return (
    <Card>
      {!submitted && (
        <CardHeader>
          <CardTitle>How happy are you with your working day?</CardTitle>
          <CardDescription>
            Submit your overall happiness survey to track your happiness with your work day.
          </CardDescription>
        </CardHeader>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          {submitted ? (
            <div className="text-center">
              <h2 className="mb-4 mt-8 text-2xl font-bold">Time for some rest!</h2>
              {randomGif && (
                <div className="mt-4">
                  <img src={randomGif} alt="Random GIF" className="mx-auto" width={500} />
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <Label>{getTodayDate()}</Label>
              <div className="flex justify-center">
                <div className="grid grid-cols-6 gap-4 pt-12">
                  {['5', '4', '2', '3', '6', '1'].map((value, index) => (
                    <SmiliesRadioButton
                      key={value}
                      value={value}
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
          )}
        </CardContent>
      </form>
    </Card>
  );
};

export default OverallHappiness;
