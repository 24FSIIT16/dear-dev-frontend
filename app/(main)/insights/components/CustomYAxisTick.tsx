import * as React from 'react';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';

interface CustomYAxisTickProps {
  x: number;
  y: number;
  payload: { value: number };
}

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({ x, y, payload }) => {
  let icon;
  if (payload.value >= 17) {
    icon = <Laugh className="h-6 w-6" />;
  } else if (payload.value >= 12) {
    icon = <Smile className="h-6 w-6" />;
  } else if (payload.value >= 7) {
    icon = <Annoyed className="h-6 w-6" />;
  } else if (payload.value >= 2) {
    icon = <Frown className="h-6 w-6" />;
  } else {
    icon = null;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-10} y={-10} width={30} height={30}>
        {icon}
      </foreignObject>
    </g>
  );
};
export default CustomYAxisTick;
