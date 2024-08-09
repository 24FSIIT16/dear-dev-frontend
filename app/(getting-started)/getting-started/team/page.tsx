import * as React from 'react';
import Explanation from '../components/Explanation';

const TeamManagementPage: React.FC = () => (
  <Explanation
    number="4"
    title="Team Management"
    content={
      <p>
        {' '}
        As the creator of a team, you become the admin, allowing you to share the invitation code, set team names, and
        determine the types of work your team will focus on. You can start directly here by creating a{' '}
        <a href="/team" className="text-blue-600 hover:underline">
          New Team
        </a>{' '}
        or{' '}
        <a href="/team" className="text-blue-600 hover:underline">
          Joining
        </a>{' '}
        one.
      </p>
    }
    hrefPrevious="/getting-started/patterns"
    labelPrevious="Happiness Patterns"
    hrefNext="/getting-started/sprint"
    labelNext="Sprint Management"
  />
);

export default TeamManagementPage;
