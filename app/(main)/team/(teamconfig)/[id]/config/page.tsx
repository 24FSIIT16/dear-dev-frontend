import * as React from 'react';
import TeamConfigForm from './components/TeamConfigForm';

interface TeamConfigPageProps {
  params: {
    id: string;
  };
}

const TeamConfigPage: React.FC<TeamConfigPageProps> = ({ params }) => {
  const { id: teamId } = params;

  return <TeamConfigForm teamId={teamId} />;
};

export default TeamConfigPage;
