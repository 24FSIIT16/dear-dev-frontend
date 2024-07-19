'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@components/ui/Card/Card';

interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  imageSrc: string;
  title: string;
  description: string;
}

const SelectableCard: React.FC<SelectableCardProps> = ({ selected, onClick, imageSrc, title, description }) => (
  <Card
    className={`cursor-pointer p-4 shadow-none ${selected ? 'ring-2 ring-inset ring-slate-900' : ''}`}
    onClick={onClick}
  >
    <CardHeader />
    <CardContent>
      <div className="flex flex-col items-center py-4">
        <Image src={imageSrc} width="80" height="80" className="py-4" alt="Illustration" />
        <h2 className="pt-8 font-semibold">{title}</h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default SelectableCard;
