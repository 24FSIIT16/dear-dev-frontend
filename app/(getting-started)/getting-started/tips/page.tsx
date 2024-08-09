import * as React from 'react';
import Explanation from '../components/Explanation';

const UsageTipsPage: React.FC = () => (
  <Explanation
    number="8"
    title="Settings and Customizations"
    content={
      <section className="space-y-4">
        <p>Here are some tips to help you make the most of yappi:</p>
        <ul className="list-inside space-y-2">
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Regular Check-Ins</p>
              <p>Make it a habit to review your scores and insights regularly to track your progress.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Set Goals</p>
              <p>Currently not available - coming soon.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Engage with your Team</p>
              <p>Currently not available - coming soon.</p>
            </div>
          </li>
        </ul>
      </section>
    }
    hrefPrevious="/getting-started/settings"
    labelPrevious="Settings and Customizations"
    hrefNext="/"
    labelNext="Dashboard"
  />
);

export default UsageTipsPage;
