/* eslint-disable import/prefer-default-export */
type TeamTable = {
  id: string;
  name: string;
  created: string;
  role: 'ADMIN' | 'MEMBER';
};

export const teams: TeamTable[] = [
  {
    id: '1',
    name: 'Team 1',
    created: 'Team Member 1',
    role: 'ADMIN',
  },
  {
    id: '2',
    name: 'Team 2',
    created: 'Team Member 2',
    role: 'MEMBER',
  },
  {
    id: '3',
    name: 'Team 3',
    created: 'Team Member 2',
    role: 'MEMBER',
  },
];
