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

interface TeamConfigFormProps {
  teamId: string;
}

const FormSchema = z.object({
  name: z.string().nonempty('ID is required'),
  workkinds: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

type FormValues = z.infer<typeof FormSchema>;

const TeamConfigForm: React.FC<TeamConfigFormProps> = ({ teamId }) => {
  console.warn(teamId);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: 'Team 1',
      workkinds: [{ value: 'Coding' }, { value: 'Meetings' }],
    },
    mode: 'onSubmit',
  });

  const { fields, append } = useFieldArray({
    name: 'workkinds',
    control: form.control,
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    toast.success('Team has been updated');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
        <FormField
          control={form.control}
          name="name"
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
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`workkinds.${index}.value`}
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
          ))}
          <Button type="button" variant="outline" size="sm" className="mt-2 p-2" onClick={() => append({ value: '' })}>
            Add worktype
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TeamConfigForm;
