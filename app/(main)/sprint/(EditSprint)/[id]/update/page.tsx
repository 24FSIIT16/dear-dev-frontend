'use client';

import * as React from 'react';
import EditSprintForm from './components/EditSprintForm';

interface EditSprintPageProps {
  params: {
    id: string;
  };
}

const EditSprintPage: React.FC<EditSprintPageProps> = ({ params }) => {
  const { id: sprintId } = params;

  return <EditSprintForm sprintId={sprintId} />;
};

export default EditSprintPage;
