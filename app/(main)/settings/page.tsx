import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';

const SettingsPage: React.FC = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h2>Account</h2>
      <p className="text-sm font-thin">Update your account settings.</p>
    </div>
    <Separator className="mt-2" />
  </div>
);

export default SettingsPage;
