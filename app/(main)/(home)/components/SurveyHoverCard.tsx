import * as React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@components/ui/HoverCard/HoverCard';
import { FilePlus } from 'lucide-react';

interface SurveyHoverCardProps {
  title: string;
  description: string;
}

const SurveyHoverCard: React.FC<SurveyHoverCardProps> = ({ title, description }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <div className="rounded-full bg-slate-900 p-2 text-white">
        <FilePlus className="h-5 w-5" />
      </div>
    </HoverCardTrigger>
    <HoverCardContent className="w-auto rounded-2xl p-4 shadow-none">
      <div className="flex flex-row gap-4">
        <div className="w-auto self-start rounded-full bg-slate-900 p-2 text-white">
          <FilePlus className="h-6 w-6" />
        </div>
        <div className="flex flex-col items-start">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="max-w-60 break-words text-sm font-thin">{description}</p>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default SurveyHoverCard;
