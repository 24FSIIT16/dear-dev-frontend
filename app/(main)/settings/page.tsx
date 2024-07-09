import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import ProfileForm from './components/ProfileForm';

const SettingsPage: React.FC = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h2>Profile</h2>
      <p className="text-sm font-thin">Update your profile settings.</p>
    </div>
    <Separator className="mt-2" />
    <ProfileForm />
  </div>
);

export default SettingsPage;
