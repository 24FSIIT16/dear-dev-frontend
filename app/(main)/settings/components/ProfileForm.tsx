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
import { Button } from '@components/ui/Buttons/Button';
import Input from '@components/ui/Input/Input';
import { useAuth } from '@providers/AuthProvider';
import { toast } from '@components/ui/Toast/use-toast';
import { UserWithProvider } from '@/types/UserType';
import Loading from '@components/Loading/Loading';
import useSWRClient from '@hooks/useSWRClient';

const FormSchema = z.object({
  username: z.string().nonempty('Username is required'),
  provider: z.string().nonempty('Provider is required'),
  name: z.string().nonempty('Name is required'),
  email: z.string().nonempty('Email is required').email('Please enter a valid email'),
});

type FormValue = z.infer<typeof FormSchema>;

const ProfileForm: React.FC = () => {
  const { userId } = useAuth();
  const { data: user, isLoading } = useSWRClient<UserWithProvider>(`/v1/user-with-provider/${userId}`);

  const form = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
    defaultValues: React.useMemo(
      () => ({
        provider: user?.provider ?? '',
        name: user?.name ?? '',
        email: user?.email ?? '',
      }),
      [user]
    ),
    mode: 'onSubmit',
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        provider: user.provider,
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const onSubmit: SubmitHandler<FormValue> = () => {
    toast({
      title: 'Success',
      description: 'Your profile has been updated.',
    });
    form.reset();
  };

  if (isLoading) return <Loading />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login provider</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Name" {...field} disabled />
              </FormControl>
              <FormDescription className="text-xs">
                This field cannot be changed as it is provided by the login provider.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Name" {...field} disabled />
              </FormControl>
              <FormDescription className="text-xs">
                This field cannot be changed as it is provided by the login provider.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="resize-none text-sm font-light" placeholder="Email" {...field} disabled />
              </FormControl>
              <FormDescription className="text-xs">
                This field cannot be changed as it is provided by the login provider.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
