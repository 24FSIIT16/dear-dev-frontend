'use client';

import * as React from 'react';
import useSWRClient from '@hooks/useSWRClient';
import { TeamWithMembers } from '@/types/TeamType';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { TeamMemberWithUser } from '@/types/TeamMemberType';
import Separator from '@components/ui/Separator/Separator';
import { Clipboard, Check } from 'lucide-react';
import Input from '@components/ui/Input/Input';
import { Button } from '@components/ui/Buttons/Button';
import { columns } from '../../../components/TeamMembersTable/columns';
import TeamMemberTable from '../../../components/TeamMembersTable/TeamMemberTable';

interface TeamMembersPageProps {
  params: {
    id: string;
  };
}

const TeamMembersPage: React.FC<TeamMembersPageProps> = ({ params }) => {
  const { id: teamId } = params;
  const [copied, setCopied] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { data, isLoading, error } = useSWRClient<TeamWithMembers>(`/v1/team-member/${teamId}`);
  const { code: teamCode } = data?.team || {};

  const copyToClipboard = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      navigator.clipboard.writeText(inputValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading members." action="/team" showContact />;

  return (
    <div>
      {data ? (
        <div>
          {data.isAdmin ? (
            <>
              <div className="space-y-1">
                <h2>Invite</h2>
                <p className="text-sm font-thin">Use this code to share and invite new members to your team.</p>
              </div>
              <div className="my-4 flex max-w-lg items-center space-x-2">
                <Button variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
                <Input ref={inputRef} disabled value={teamCode} />
              </div>
              <Separator className="my-8" />
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2>Manage</h2>
                  <p className="text-sm font-thin">All team members listed.</p>
                </div>
                <TeamMemberTable<TeamMemberWithUser> columns={columns} data={data.members} />
              </div>
            </>
          ) : (
            <TeamMemberTable<TeamMemberWithUser> columns={columns} data={data.members} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TeamMembersPage;
