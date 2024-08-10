import * as React from 'react';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import { TooltipProps } from 'recharts';

interface CustomToolTipProps extends TooltipProps<number, string> {
  payload?: { value: number }[];
}

const ContributionToolTip: React.FC<CustomToolTipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const userAverage = payload[0] ? payload[0].value : 0;
    const contributions = payload[1] ? payload[1].value : 0;

    const getIcon = (value: number) => {
      if (value >= 17) {
        return <Laugh className="h-6 w-6" />;
      }
      if (value >= 11) {
        return <Smile className="h-6 w-6" />;
      }
      if (value >= 6) {
        return <Annoyed className="h-6 w-6" />;
      }
      if (value >= 2) {
        return <Frown className="h-6 w-6" />;
      }
      return null;
    };

    return (
      <div className="custom-tooltip rounded border bg-white p-2 shadow-lg dark:bg-primaryBG-dark">
        <p className="label font-bold">{`${label}`}</p>
        {userAverage > 0 && (
          <div className="tooltip-item mt-2 flex items-center">
            <span className="icon mr-2">{getIcon(userAverage)}</span>
            <span className="value">{`Personal (${userAverage})`}</span>
          </div>
        )}
        <div className="tooltip-item mt-2 flex items-center">
          <span className="value">{`Contributions: ${contributions}`}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default ContributionToolTip;
