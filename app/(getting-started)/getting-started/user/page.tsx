import * as React from 'react';
import Explanation from '../components/Explanation';

const UserProfilePage: React.FC = () => (
  <Explanation
    number="6"
    title="User Profile"
    content={
      <p>
        Set your name, roles, and other personal information in your{' '}
        <a href="/settings" className="text-blue-600 hover:underline">
          User Profile
        </a>{' '}
        to help your team understand better how your happiness is connected with your work and productivity.
      </p>
    }
    hrefPrevious="/getting-started/sprint"
    labelPrevious="Sprint Management"
    hrefNext="/getting-started/settings"
    labelNext="Settings and Customizations"
  />
);

export default UserProfilePage;
