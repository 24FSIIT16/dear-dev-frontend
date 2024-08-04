'use client';

import * as React from 'react';
import { Card, CardContent } from '@components/ui/Card/Card';

interface SelectableCardProps {
  onClick: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const SelectableCard: React.FC<SelectableCardProps> = ({ onClick, title, description, icon }) => (
  <Card
    className="group cursor-pointer rounded-3xl border-none bg-primaryBlue-light p-4 shadow-none hover:bg-primaryBlue-main"
    onClick={onClick}
  >
    <CardContent className="text-primaryBlue-main group-hover:text-white">
      <div className="flex flex-col items-start py-4 text-left">
        <div className="rounded-full bg-primaryBlue-main p-4 group-hover:bg-white">{icon}</div>
        <div className="space-y-1 pt-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-md max-w-xs font-light">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default SelectableCard;
