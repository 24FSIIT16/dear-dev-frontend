'use client';

import * as React from 'react';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';

interface CustomHorizontalBarChartLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

const CustomHorizontalBarChartLabel: React.FC<CustomHorizontalBarChartLabelProps> = ({ x, y, width, value }) => {
  if (value === undefined || x === undefined || y === undefined || width === undefined) return null;

  const iconSize = 24;

  const getIcon = (valueIcon: number) => {
    if (valueIcon >= 17) {
      return <Laugh className="h-6 w-6" />;
    }
    if (valueIcon >= 12) {
      return <Smile className="h-6 w-6" />;
    }
    if (valueIcon >= 7) {
      return <Annoyed className="h-6 w-6" />;
    }
    if (valueIcon >= 2) {
      return <Frown className="h-6 w-6" />;
    }
    return null;
  };

  return (
    <g transform={`translate(${x + width + 8}, ${y - iconSize / 4} )`}>
      <foreignObject width={iconSize} height={iconSize}>
        {getIcon(value)}
      </foreignObject>
    </g>
  );
};

export default CustomHorizontalBarChartLabel;
