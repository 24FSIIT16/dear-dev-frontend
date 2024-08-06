import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { Hash } from 'lucide-react';

interface NumberWidgetProps {
  number: number | undefined;
  description: string;
}

const NumberWidget: React.FC<NumberWidgetProps> = ({ number, description }) => (
  <Card className="group flex flex-col rounded-2xl border-none bg-primaryBlue-light shadow-none hover:bg-primaryBlue-main">
    <CardHeader className="flex flex-row">
      <div className="flex-1" />
      <div className="rounded-full bg-primaryBlue-main p-2 text-white group-hover:bg-white group-hover:text-primaryBlue-main">
        <Hash className="h-4 w-4" />
      </div>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col justify-end">
      <div className="space-y-1 text-primaryBlue-main group-hover:text-white">
        <h1 className="text-4xl sm:text-4xl md:text-6xl">{number}</h1>
        <p className="md:text-md text-sm font-light">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default NumberWidget;
