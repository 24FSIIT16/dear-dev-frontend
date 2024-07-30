/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import * as React from 'react';
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
import cn from '@/lib/utils';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import { TeamConfigType } from '@/types/TeamConfigType';

interface TeamConfigFormProps {
  config: TeamConfigType;
}

const FormSchema = z.object({
  teamName: z.string().nonempty('Team name is required'),
  workKinds: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
    })
  ),
  happinessSurvey: z.boolean().default(true).optional(),
  workKindSurvey: z.boolean().default(true).optional(),
  emotionSurvey: z.boolean().default(true).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const TeamConfigForm: React.FC<TeamConfigFormProps> = ({ config }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teamName: config?.teamName || '',
      workKinds: config?.workKinds.map((w) => ({ id: w.id, name: w.name })) || [{ id: undefined, name: '' }],
      happinessSurvey: config?.happinessSurvey || true,
      workKindSurvey: config?.workKindSurvey || true,
      emotionSurvey: config?.emotionSurvey || true,
    },
    mode: 'onSubmit',
  });

  const { fields, append } = useFieldArray({
    name: 'workKinds',
    control: form.control,
  });

  const surveyItems = [
    { id: 'happinessSurvey', label: 'Happiness' },
    { id: 'workKindSurvey', label: 'Worktype' },
    { id: 'emotionSurvey', label: 'Emotion' },
  ];

  const onSubmit: SubmitHandler<FormValues> = () => {
    toast.success('Team has been updated');
  };

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
                        disabled={item.id === 'happinessSurvey'}
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
