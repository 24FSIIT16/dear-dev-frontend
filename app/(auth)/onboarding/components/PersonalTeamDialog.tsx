'use client';

import * as React from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@components/ui/Dialog/Dialog';
import { Button } from '@components/ui/Buttons/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/Form/Form';

const FormSchema = z.object({
  name: z.string().nonempty('Team name is required'),
});

type FormValues = z.infer<typeof FormSchema>;

const PersonalTeamDialog: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: 'Personal team',
    },
    mode: 'onSubmit',
  });

  const handleSubmit: SubmitHandler<FormValues> = () => {};

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a personal team</DialogTitle>
        <DialogDescription>Give your team a name and get started.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input className="resize-none text-sm font-light" placeholder="Team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Create Team</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default PersonalTeamDialog;
