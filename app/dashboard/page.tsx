import * as React from 'react';
import BasicCard from '@components/Cards/Basic';
import DailyHappinessSurvey from '@components/Cards/DailyHappinessSurvey';

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="items-right flex gap-3">
          <BasicCard></BasicCard>
          <DailyHappinessSurvey></DailyHappinessSurvey>
        </div>
        <BasicCard></BasicCard>
      </div>
    </main>
  );
}
