/* eslint-disable @typescript-eslint/no-unsafe-argument */

'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { Textarea } from '@components/ui/Text/Textarea';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from 'sonner';
import axios from 'axios';
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/Popover/Popover';
import cn from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@components/ui/Calendar/Calendar';
import { format } from 'date-fns';

const FormSchema = z
  .object({
    sprintName: z.string().nonempty('Sprint name is required'),
    sprintGoal: z.string(),
    startDate: z.date({
      required_error: 'A start date is required',
    }),
    endDate: z.date({
      required_error: 'An end date is required',
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after the start date',
    path: ['endDate'],
  });

type FormValues = z.infer<typeof FormSchema>;

const CreateSprintForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: React.useMemo(
      () => ({
        sprintName: '',
        sprintGoal: '',
        startDate: undefined,
        endDate: undefined,
      }),
      []
    ),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      console.warn(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Something went wrong: ${error.message}`);
      } else {
        console.warn('Error', error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
        <FormField
          control={form.control}
          name="sprintName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sprint name</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Name" {...field} />
              </FormControl>
              <FormDescription className="text-xs">This is the name of your sprint.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sprintGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sprint Goal</FormLabel>
              <FormControl>
                <Textarea className="resize-none text-sm font-light" placeholder="Goal..." {...field} />
              </FormControl>
              <FormDescription className="text-xs">Define a goal for your sprint.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-8">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : <span className="font-light">Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">Start date of the sprint.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : <span className="font-light">Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">End date of the sprint.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create Sprint</Button>
      </form>
    </Form>
  );
};

export default CreateSprintForm;
