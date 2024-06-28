import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/Card/Card';

const BasicCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle title="Title" />
      <CardDescription>Subtitle</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
  </Card>
);

export default BasicCard;
