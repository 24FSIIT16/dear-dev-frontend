import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';

interface SprintWidgetProps {
  icon: React.ReactNode;
  content: React.ReactNode;
  description: string;
}

const SprintWidget: React.FC<SprintWidgetProps> = ({ icon, content, description }) => (
  <Card className="group flex flex-col rounded-2xl border-none bg-primaryGreen-light shadow-none hover:bg-primaryGreen-main">
    <CardHeader className="flex flex-row">
      <div className="flex-1" />
      <div className="rounded-full bg-primaryGreen-main p-2 text-white group-hover:bg-white group-hover:text-primaryGreen-main">
        {icon}
      </div>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col justify-end">
      <div className="space-y-1 text-primaryGreen-main group-hover:text-white">
        <h1 className="text-4xl md:text-4xl lg:text-6xl">{content}</h1>
        <p className="md:text-md text-sm font-light">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default SprintWidget;
