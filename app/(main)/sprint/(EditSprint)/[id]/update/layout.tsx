import * as React from 'react';
import Separtor from '@components/ui/Separator/Separator';

interface EditSprintPageProps {
  children: React.ReactNode;
}

const EditSprintPage: React.FC<EditSprintPageProps> = ({ children }) => (
  <div className="space-y-8 px-16 pb-16">
    <div className="space-y-0.5">
      <h1>Update sprint</h1>
      <p className="text-md font-thin">Sprint smarter - update your created sprint.</p>
    </div>
    <Separtor className="dark:border-secondaryBG-dark" />
    <div>{children}</div>
  </div>
);

export default EditSprintPage;
