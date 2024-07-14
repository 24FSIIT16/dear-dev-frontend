'use client';

import * as React from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@components/ui/Dialog/Dialog';
import { Button } from '@components/ui/Buttons/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/Form/Form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@components/ui/InputOTP/InputOTP';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const FormSchema = z.object({
  code: z.string().min(4, {
    message: 'Code must be 4 digits',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const JoinTeamDialog: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmit: SubmitHandler<FormValues> = () => {};

  return (
    <>
      <DialogHeader>
        <DialogTitle>Join a team</DialogTitle>
        <DialogDescription>Fill the four-digit code, that should be provided to you by a team admin.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Join Team</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default JoinTeamDialog;
