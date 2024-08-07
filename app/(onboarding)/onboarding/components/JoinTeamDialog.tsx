'use client';

import * as React from 'react';
import Link from 'next/link';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@components/ui/Dialog/Dialog';
import { Button } from '@components/ui/Buttons/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/Form/Form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@components/ui/InputOTP/InputOTP';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useAuth } from '@providers/AuthProvider';
import useTeamClient from '@hooks/useTeamClient';
import { BadgeCheck, Loader2 } from 'lucide-react';
import { Team } from '@/types/TeamType';

interface JoinTeamDialogProps {
  afterOnBoarding?: boolean;
}

const FormSchema = z.object({
  code: z.string().min(4, {
    message: 'Code must be 4 digits',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const JoinTeamDialog: React.FC<JoinTeamDialogProps> = ({ afterOnBoarding = false }) => {
  const { userId } = useAuth();
  const { joinTeam } = useTeamClient();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [joinedTeam, setJoinedTeam] = React.useState<Team | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      await joinTeam({ code: data.code, userId }).then((response) => {
        setJoinedTeam(response.data);
      });
    } catch (error) {
      console.error(error);
      form.setError('code', {
        type: 'manual',
        message: 'Failed to join team with this code. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {joinedTeam ? (
            <div className="flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5" />
              Woho!
            </div>
          ) : (
            'Join a team'
          )}
        </DialogTitle>
        <DialogDescription className="font-thin text-black">
          {joinedTeam ? (
            <span className="max-w-md">
              You have successfully joined the team <span className="font-bold underline">{joinedTeam.name}</span>.
            </span>
          ) : (
            'Fill the four-digit code, this code should be provided to you by an admin.'
          )}
        </DialogDescription>
      </DialogHeader>
      {!joinedTeam ? (
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
              {!isLoading ? (
                <Button type="submit">Join Team</Button>
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
          <div>
            <DialogClose asChild>
              <Link href={!afterOnBoarding ? `/team/${joinedTeam.id}/members` : '/getting-started'}>
                <Button className="mt-8 px-8">Continue</Button>
              </Link>
            </DialogClose>
          </div>
        </DialogFooter>
      )}
    </>
  );
};

export default JoinTeamDialog;
