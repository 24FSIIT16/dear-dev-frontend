'use client';

import * as React from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@components/ui/Dialog/Dialog';
import { Button } from '@components/ui/Buttons/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import { useAuth } from '@providers/AuthProvider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/Form/Form';
import useTeamClient from '@hooks/useTeamClient';
import { BadgeCheck, Loader2 } from 'lucide-react';

const FormSchema = z.object({
  name: z.string().nonempty('Team name is required'),
});

type FormValues = z.infer<typeof FormSchema>;

const PersonalTeamDialog: React.FC = () => {
  const { userId } = useAuth();
  const { createTeam } = useTeamClient();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      await createTeam({ name: data.name, userId });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {success ? (
            <div className="flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5" />
              Woho!
            </div>
          ) : (
            'Create a team'
          )}
        </DialogTitle>
        <DialogDescription>
          {success ? (
            <p className="max-w-md">
              Your yappi team was created successfully. Start your happiness journey and invite new team members.
            </p>
          ) : (
            'Give your team a name and get started.'
          )}
        </DialogDescription>
      </DialogHeader>
      {!success ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team name</FormLabel>
                  <FormControl>
                    <Input className="resize-none text-sm font-light" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {!isLoading ? (
                <Button type="submit">Create Team</Button>
              ) : (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      ) : (
        <DialogFooter>
          <Button className="mt-8 px-8">Continue</Button>
        </DialogFooter>
      )}
    </>
  );
};

export default PersonalTeamDialog;
