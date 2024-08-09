import * as React from 'react';
import Explanation from '../components/Explanation';

const PatternsPage: React.FC = () => (
  <Explanation
    number="3"
    title="Discovering Happiness Patterns"
    content={
      <section className="space-y-4">
        <p>yappi helps you uncover patterns in your happiness data to make informed decisions:</p>
        <ul className="list-inside space-y-2">
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Positive Trends</p>
              <p>
                Identify the activities and interactions that consistently boost your mood. Use these insights to
                prioritize tasks and relationships that contribute to your well-being.
              </p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Team Dynamics</p>
              <p>
                Understand how your mood aligns with your team. This can help in improving teamwork and communication,
                fostering a more collaborative environment.
              </p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Areas for Improvement</p>
              <p>
                Pinpoint areas that negatively impact your happiness. Use this information to make necessary changes,
                whether it’s in your work habits or personal life.
              </p>
            </div>
          </li>
        </ul>
      </section>
    }
    hrefPrevious="/getting-started/happiness"
    labelPrevious="Happiness Data"
    hrefNext="/getting-started/team"
    labelNext="Team Management"
  />
);

export default PatternsPage;
