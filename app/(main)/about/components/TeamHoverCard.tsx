import { Button } from '@components/ui/Buttons/Button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@components/ui/HoverCard/HoverCard';
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/Avatar/Avatar';
import * as React from 'react';
import { Mail } from 'lucide-react';

interface TeamHoverCardProps {
  trigger: string;
  img: string;
  mail: string;
  description: string;
}

const TeamHoverCard: React.FC<TeamHoverCardProps> = ({ trigger, img, mail, description }) => (
  <HoverCard>
    <HoverCardTrigger>
      <Button variant="link" className="-ml-4">
        {trigger}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="font-xs w-auto p-4 font-thin">
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src={img} />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{trigger}</h4>
            <p className="max-w-60 break-words text-sm font-thin">{description}</p>
          </div>
          <div className="flex items-center pt-2">
            <Mail className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-xs">{mail}</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default TeamHoverCard;
