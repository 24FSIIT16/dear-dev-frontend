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
import { Textarea } from '@components/ui/Text/Textarea';
import { Button } from '@components/ui/Buttons/Button';
import { toast } from '@components/ui/Toast/use-toast';
import { useAuth } from '@providers/AuthProvider';
import Input from '@components/ui/Input/Input';

const FormSchema = z.object({
  message: z.string().nonempty('Message is required'),
  email: z.string().nonempty('Email is required').email('Please enter a valid email'),
});

type FormValues = z.infer<typeof FormSchema>;

const ContactForm: React.FC = () => {
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
      email: user?.email ?? '',
    },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    toast({
      title: 'Success',
      description: 'Your message | issue has been sent.',
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                This is the email we will respond to. Please provide us with an email address to which we should replay.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message | Issue</FormLabel>
              <FormControl>
                <Textarea className="resize-none text-sm font-light" placeholder="Describe your.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ContactForm;
