import * as React from 'react';
import Separtor from '@components/ui/Separator/Separator';

interface CreateSprintLayoutProps {
  children: React.ReactNode;
}

const CreateSprintLayout: React.FC<CreateSprintLayoutProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Create a sprint</h1>
      <p className="text-md font-thin">Sprint smarter - get startet with sprints.</p>
    </div>
    <Separtor className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default CreateSprintLayout;
