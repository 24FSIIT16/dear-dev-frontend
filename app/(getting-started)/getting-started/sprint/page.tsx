import * as React from 'react';
import Explanation from '../components/Explanation';

const SprintManagementPage: React.FC = () => (
  <Explanation
    number="5"
    title="Sprint Management"
    content={
      <p>
        Create, start, and stop sprints for your teams. Set the sprint goals, start and end dates, and add all relevant
        sprint data here. You can{' '}
        <a href="/sprint" className="text-blue-600 hover:underline">
          Manage Sprints
        </a>{' '}
        directly here.
      </p>
    }
    hrefPrevious="/getting-started/team"
    labelPrevious="Team Management"
    hrefNext="/getting-started/user"
    labelNext="User Profile"
  />
);

export default SprintManagementPage;
