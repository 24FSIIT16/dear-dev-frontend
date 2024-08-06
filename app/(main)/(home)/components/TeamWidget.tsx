import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';

interface TeamWidgetProps {
  icon: React.ReactNode;
  number: number;
  description: string;
}

const TeamWidget: React.FC<TeamWidgetProps> = ({ icon, number, description }) => (
  <Card className="group flex h-auto flex-col rounded-2xl border-none bg-primaryRed-light shadow-none hover:bg-primaryRed-main">
    <CardHeader className="flex flex-row">
      <div className="flex-1" />
      <div className="rounded-full bg-primaryRed-main p-2 text-white group-hover:bg-white group-hover:text-primaryRed-main">
        {icon}
      </div>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col justify-end">
      <div className="space-y-1 text-primaryRed-main group-hover:text-white">
        <h1 className="text-4xl sm:text-4xl md:text-6xl">{number}</h1>
        <p className="md:text-md text-sm font-light">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default TeamWidget;
