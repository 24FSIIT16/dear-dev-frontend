import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { Siren } from 'lucide-react';

interface AlertWidgetProps {
  days: number;
}

const AlertWidget: React.FC<AlertWidgetProps> = ({ days }) => (
  <Card className="group flex h-full w-full flex-col rounded-2xl border-none bg-primaryYellow-light shadow-none hover:bg-primaryYellow-main">
    <CardHeader className="flex flex-row">
      <div className="flex-1" />
      <div className="rounded-full bg-primaryYellow-main p-2 text-white group-hover:animate-icon-bounce group-hover:bg-white group-hover:text-primaryYellow-main">
        <Siren className="h-5 w-5" />
      </div>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col justify-end">
      <div className="space-y-1 text-primaryYellow-main group-hover:text-white">
        <h1 className="text-4xl md:text-4xl lg:text-6xl">{days}</h1>
        <p className="md:text-md text-sm font-light">Days without any happiness tracking.</p>
      </div>
    </CardContent>
  </Card>
);

export default AlertWidget;
