'use client';

import * as React from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@components/ui/Dialog/Dialog';
import { Button } from '@components/ui/Buttons/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import { useAuth } from '@providers/AuthProvider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/Form/Form';
import useTeamClient from '@hooks/useTeamClient';
import { BadgeCheck, Loader2, Clipboard, Check } from 'lucide-react';
import { Team } from '@/types/TeamType';
import Link from 'next/link';

const FormSchema = z.object({
  name: z.string().nonempty('Team name is required'),
});

type FormValues = z.infer<typeof FormSchema>;

const CreateTeamDialog: React.FC = () => {
  const { userId } = useAuth();
  const { createTeam } = useTeamClient();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [createdTeam, setCreatedTeam] = React.useState<Team | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
      await createTeam({ name: data.name, userId }).then((response) => {
        setCreatedTeam(response.data);
      });
    } catch (error) {
      console.error(error);
      form.setError('name', {
        type: 'manual',
        message: 'Failed to create team. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      navigator.clipboard.writeText(inputValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {createdTeam ? (
            <div className="flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5" />
              Woho!
            </div>
          ) : (
            'Create a team'
          )}
        </DialogTitle>
        <DialogDescription className="font-thin text-black">
          {createdTeam ? (
            <span className="max-w-md">
              Your yappi team was created successfully. Start your happiness journey and invite new team members with
              the code below:
            </span>
          ) : (
            'Give your team a name and get started.'
          )}
        </DialogDescription>
      </DialogHeader>
      {!createdTeam ? (
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
        <>
          <div className="flex w-full items-center space-x-2">
            <Button variant="outline" onClick={() => copyToClipboard()}>
              {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            </Button>
            <Input ref={inputRef} disabled value={createdTeam?.code} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Link href={`/team/${createdTeam.id}/config`}>
                <Button className="mt-8 px-8">Continue</Button>
              </Link>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
};

export default CreateTeamDialog;
