'use client';

import { Card, CardContent } from '@components/ui/Card/Card';

export default function InsightsSummary() {
  return (
    <Card>
      <CardContent>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Know Your Happiness Patterns</p>
            </div>
            <div className="flex items-center text-xs font-light">happiness down, productivity down</div>
            <div className="flex items-center text-xs font-light">most happiness influencing worktype..</div>
            <div className="flex items-center text-xs font-light">correlations..</div>
          </div>
        </div>
      </CardContent>{' '}
    </Card>
  );
}
