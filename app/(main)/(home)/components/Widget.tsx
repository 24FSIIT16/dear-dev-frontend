import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';

interface WidgetProps {
  icon: React.ReactNode;
  content: React.ReactNode;
  description: string;
}

const Widget: React.FC<WidgetProps> = ({ icon, content, description }) => (
  <Card className="group flex h-auto flex-col rounded-2xl border-none bg-primaryBlue-light shadow-none hover:bg-primaryBlue-main md:h-full">
    <CardHeader className="flex flex-row">
      <div className="flex-1" />
      <div className="rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main">
        {icon}
      </div>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col justify-end">
      <div className="space-y-1 text-primaryBlue-main group-hover:text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">{content}</h1>
        <p className="md:text-md text-sm font-light">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default Widget;
