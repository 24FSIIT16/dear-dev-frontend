import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/Card/Card';

interface CardProps {
  header: {
    title: string;
    icon?: React.ReactNode;
  };
  content: {
    mainContent: React.ReactNode;
    subContent?: React.ReactNode;
  };
}

const BasicSmallCard: React.FC<CardProps> = ({ header, content }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{header.title}</CardTitle>
      {header.icon && <div className="text-muted-foreground h-4 w-4">{header.icon}</div>}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{content.mainContent}</div>
      {content.subContent && <p className="text-muted-foreground text-xs">{content.subContent}</p>}
    </CardContent>
  </Card>
);

export default BasicSmallCard;
