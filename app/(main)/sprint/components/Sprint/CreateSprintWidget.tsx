import * as React from 'react';
import { Card, CardContent } from '@components/ui/Card/Card';
import { Bike } from 'lucide-react';
import Link from 'next/link';

const CreateSprintWidget: React.FC = () => (
  <Link href="/sprint/create">
    <Card className="group cursor-pointer rounded-3xl border-none bg-primaryGreen-light p-2 shadow-none hover:bg-primaryGreen-main">
      <CardContent className="text-primaryGreen-main group-hover:text-white">
        <div className="flex flex-col items-start py-4">
          <div className="rounded-full bg-primaryGreen-main p-4 group-hover:bg-white">
            <Bike className="h-5 w-5 text-white group-hover:text-primaryGreen-main" />
          </div>
          <div className="space-y-1 pt-6">
            <h1>Achieve More, Smile More</h1>
            <p className="max-w-4xl text-sm font-light md:text-lg">
              You have not created a sprint yet. Combine the power of agile sprints with happiness tracking. Start a
              sprint to align your goals with well-being. Get started by clicking on this card.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default CreateSprintWidget;
