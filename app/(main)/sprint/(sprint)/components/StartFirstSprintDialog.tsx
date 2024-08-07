'use client';

import * as React from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@components/ui/Dialog/Dialog';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@components/ui/Select/Select';
import { Button } from '@components/ui/Buttons/Button';
import useSWRClient from '@hooks/useSWRClient';
import { SprintsAndTeams } from '@/types/SprintType';
import useSprintConfigClient from '@hooks/useSprintConfigClient';

interface StartFirstSprintDialogProps {
  onSuccess: () => void;
}

const FormSchema = z.object({
  teamId: z.string({
    required_error: 'Please select a team',
  }),
  sprintId: z.string({
    required_error: 'Please select a sprint',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const StartFirstSprintDialog: React.FC<StartFirstSprintDialogProps> = ({ onSuccess }) => {
  const { data } = useSWRClient<SprintsAndTeams>('/v1/sprint/sprints-and-teams');
  const { startSprint } = useSprintConfigClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      await startSprint(formData.sprintId, formData.teamId);
      toast.success('Sprint started successfully');
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Something went wrong: ${error.message}`);
      } else {
        console.warn('Error', error);
      }
    }
  };

  const teamsAvailable = !data?.teams || data.teams.length === 0;
  const sprintsAvailable = !data?.sprints || data.sprints.length === 0;

  React.useEffect(() => {
    form.clearErrors();

    if (teamsAvailable) {
      form.setError('teamId', {
        type: 'manual',
        message: 'No valid teams available to select',
      });
    }
    if (sprintsAvailable) {
      form.setError('sprintId', {
        type: 'manual',
        message: 'No valid sprints available to select',
      });
    }
  }, [teamsAvailable, sprintsAvailable, form]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Start a sprint</DialogTitle>
        <DialogDescription className="font-thin text-black">
          You can only select teams that do not have an active sprint. Please complete any active sprint before starting
          a new one. Additionally, you can only select sprints that are in the OPEN status with a start date of today or
          in the future.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={teamsAvailable}>
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">The team you want to start a sprint for.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sprintId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sprint</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={sprintsAvailable}>
                      <SelectValue placeholder="Select a sprint" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.sprints.map((sprint) => (
                      <SelectItem key={sprint.id} value={sprint.id.toString()}>
                        {sprint.sprintName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">The sprint you want to start.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <Button type="submit">Start</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default StartFirstSprintDialog;
