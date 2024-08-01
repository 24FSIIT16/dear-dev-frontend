import * as React from 'react';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ x, y, value, width }) => {
  if (value === undefined || x === undefined || y === undefined || width === undefined) return null;

  const iconSize = 24;

  const getIcon = (valueIcon: number) => {
    if (valueIcon >= 17) {
      return <Laugh className="h-4 w-4" />;
    }
    if (valueIcon >= 12) {
      return <Smile className="h-4 w-4" />;
    }
    if (valueIcon >= 7) {
      return <Annoyed className="h-4 w-4" />;
    }
    if (valueIcon >= 2) {
      return <Frown className="h-4 w-4" />;
    }
    return null;
  };

  return <g transform={`translate(${x + width / 2 - iconSize / 2}, ${y - 30})`}>{getIcon(value)}</g>;
};

export default CustomLabel;
