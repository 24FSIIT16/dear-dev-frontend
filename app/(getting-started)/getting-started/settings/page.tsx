import * as React from 'react';
import Explanation from '../components/Explanation';

const SettingsAndCustomizationsPage: React.FC = () => (
  <Explanation
    number="7"
    title="Settings and Customizations"
    content={
      <section className="space-y-4">
        <p>
          Tailor your yappi experience by adjusting the settings to fit your preferences. Here&apos;s how you can
          customize your settings:
        </p>
        <ul className="list-inside space-y-2">
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Profile Settings</p>
              <p>
                Update your personal information and preferences in the{' '}
                <a href="/settings" className="text-blue-600 hover:underline">
                  Settings Menu
                </a>
                .
              </p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Notification Preferences</p>
              <p>Currently not available - coming soon.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Dashboard Layout</p>
              <p>Currently not available - coming soon.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Integrate Productivity Tools</p>
              <p>Currently not available - coming soon.</p>
            </div>
          </li>
        </ul>
      </section>
    }
    hrefPrevious="/getting-started/user"
    labelPrevious="User Profile"
    hrefNext="/getting-started/tips"
    labelNext="Usage Tips"
  />
);

export default SettingsAndCustomizationsPage;
