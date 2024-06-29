import * as React from 'react';
import BasicCard from '@components/Cards/Basic';
import OverallHappiness from '@components/Surveys/OverallHappiness';
import WorkItemHappiness from '@components/Surveys/WorkItemHappiness';
import Feedback from '@components/Surveys/Feedback';

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-6 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-6">
        <div className="flex gap-6">
          <BasicCard />
          <div className="flex flex-col gap-6">
            <OverallHappiness />
            <BasicCard />
          </div>
          <div className="flex flex-col gap-6">
            <WorkItemHappiness />
            <Feedback />
          </div>
        </div>
        <BasicCard />
      </div>
    </main>
  );
}
