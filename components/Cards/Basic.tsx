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
  borderColor?: string;
  fontColor?: string;
}

const BasicSmallCard: React.FC<CardProps> = ({ header, content, borderColor, fontColor }) => (
  <Card className={borderColor}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="space-x-2 text-sm font-medium">{header.title}</CardTitle>
      {header.icon && <div className="text-muted-foreground h-2 w-4">{header.icon}</div>}
    </CardHeader>
    <CardContent className={fontColor}>
      <div className="text-2xl font-bold">{content.mainContent}</div>
      {content.subContent && <p className="text-muted-foreground text-xs">{content.subContent}</p>}
    </CardContent>
  </Card>
);

export default BasicSmallCard;
