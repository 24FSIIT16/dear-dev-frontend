import { Button } from '@components/ui/Buttons/Button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@components/ui/HoverCard/HoverCard';
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/Avatar/Avatar';
import * as React from 'react';

interface TeamHoverCardProps {
  trigger: string;
  img: string;
  description: string;
}

const TeamHoverCard: React.FC<TeamHoverCardProps> = ({ trigger, img, description }) => (
  <HoverCard>
    <HoverCardTrigger>
      <Button variant="link" className="text-md -ml-4 font-normal">
        {trigger}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="font-xs w-auto p-4 font-thin">
      <div className="flex justify-between space-x-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={img} />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{trigger}</h4>
            <p className="max-w-60 break-words text-sm font-thin">{description}</p>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default TeamHoverCard;
