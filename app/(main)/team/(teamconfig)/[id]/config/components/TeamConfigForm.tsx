/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form/Form';
import Input from '@components/ui/Input/Input';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from 'sonner';
import useSWRClient from '@hooks/useSWRClient';
import cn from '@/lib/utils';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import { TeamConfigType } from '@/types/TeamConfigType';
import useTeamClient from '@hooks/useTeamClient';
import axios from 'axios';
import Loading from '@components/Loading/Loading';

interface TeamConfigFormProps {
  teamId: string;
}

const FormSchema = z.object({
  teamName: z.string().nonempty('Team name is required'),
  workKinds: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
    })
  ),
  happinessSurvey: z.boolean().optional(),
  workKindSurvey: z.boolean().optional(),
  emotionSurvey: z.boolean().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const TeamConfigForm: React.FC<TeamConfigFormProps> = ({ teamId }) => {
  const router = useRouter();
  const { data: config, isLoading } = useSWRClient<TeamConfigType>(`/v1/team/${teamId}/config`);
  const { updateTeamConfig } = useTeamClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: React.useMemo(
      () => ({
        teamName: config?.teamName || '',
        workKinds: config?.workKinds.map((w) => ({ id: w.id, name: w.name })) || [{ id: undefined, name: '' }],
        happinessSurvey: config?.happinessSurvey ?? false,
        workKindSurvey: config?.workKindSurvey ?? false,
        emotionSurvey: config?.emotionSurvey ?? false,
      }),
      [config]
    ),
    mode: 'onSubmit',
  });

  const { fields, append } = useFieldArray({
    name: 'workKinds',
    control: form.control,
  });

  const surveyItems = [
    { id: 'happinessSurvey', label: 'Happiness', value: config?.happinessSurvey, disabled: true },
    { id: 'emotionSurvey', label: 'Emotion', value: config?.emotionSurvey, disabled: true },
    { id: 'workKindSurvey', label: 'Worktype', value: config?.workKindSurvey, disabled: false },
  ];

  React.useEffect(() => {
    if (config) {
      form.reset({
        teamName: config.teamName,
        workKinds: config.workKinds.map((w) => ({ id: w.id, name: w.name })),
        happinessSurvey: config.happinessSurvey,
        workKindSurvey: config.workKindSurvey,
        emotionSurvey: config.emotionSurvey,
      });
    }
  }, [config, form]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updatedConfig = {
      ...data,
      id: teamId,
    } as TeamConfigType;
    try {
      await updateTeamConfig(teamId, updatedConfig);
      toast.success('Team configuration has been updated');
      router.push('/team');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Something went wrong: ${error.message}`);
      } else {
        console.warn('Error: ', error);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Name" {...field} />
              </FormControl>
              <FormDescription className="text-xs">This is the name of your team.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4">Surveys</h3>
          <div className="space-y-2">
            {surveyItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id as keyof FormValues}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl className="flex flex-row items-center">
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        disabled={item.disabled}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-light">{item.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
            <FormDescription className="mb-4 mt-2 text-xs">
              Select the surveys you want to display for your team.
            </FormDescription>
          </div>
        </div>
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`workKinds.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>Worktypes</FormLabel>
                    <FormDescription className={cn('text-xs', index !== 0 && 'sr-only')}>
                      Add or edit worktypes for your team.
                    </FormDescription>
                    <FormControl>
                      <Input className="text-sm font-light" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 p-2"
            onClick={() => append({ id: undefined, name: '' })}
          >
            Add worktype
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TeamConfigForm;
