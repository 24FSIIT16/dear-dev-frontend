import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';

interface AlertWidgetProps {
  icon: React.ReactNode;
  days: number;
}

const AlertWidget: React.FC<AlertWidgetProps> = ({ icon, days }) => (
  <Card className="group rounded-2xl bg-primaryRed-light shadow-none hover:bg-primaryRed-main">
    <CardHeader className="flex flex-row">
      <div className="flex-1" />
      <div className="rounded-full bg-primaryRed-main p-2 text-white group-hover:animate-icon-bounce group-hover:bg-white group-hover:text-primaryRed-main">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-1 text-primaryRed-main group-hover:text-white">
        <h1 className="text-4xl md:text-4xl lg:text-6xl">{days}</h1>
        <p className="md:text-md text-sm font-light">Days without any happiness tracking.</p>
      </div>
    </CardContent>
  </Card>
);

export default AlertWidget;
