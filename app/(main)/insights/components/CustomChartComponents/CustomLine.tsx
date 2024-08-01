import * as React from 'react';

interface LinePoint {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  key: string;
}

interface CustomLineProps {
  points: LinePoint[];
  color: string;
}

const CustomLine: React.FC<CustomLineProps> = ({ points, color }) => (
  <>
    {points.map((point) => (
      <line
        key={point.key}
        x1={point.x1}
        y1={point.y1}
        x2={point.x2}
        y2={point.y2}
        stroke={color}
        strokeDasharray="5 5"
        strokeWidth={2}
      />
    ))}
  </>
);

export default CustomLine;
