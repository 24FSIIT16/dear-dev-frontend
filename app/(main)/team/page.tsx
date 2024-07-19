import * as React from 'react';
import { columns, TeamType } from './components/TeamTable/columns';
import { teams } from './components/TeamTable/data';
import TeamTable from './components/TeamTable/TeamTable';

const TeamPage: React.FC = () => (
  <div className="space-y-4">
    <TeamTable<TeamType> columns={columns} data={teams} />
  </div>
);

export default TeamPage;
