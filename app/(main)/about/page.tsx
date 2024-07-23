import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import TeamHoverCard from './components/TeamHoverCard';

const AboutPage: React.FC = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h2>About us</h2>
      <p className="text-sm font-thin">The team behinde yappi.</p>
    </div>
    <Separator className="mt-2" />
    <div className="flex w-64 flex-row justify-between">
      <TeamHoverCard
        trigger="@petra"
        img="/assets/Avatar/Team/petra.svg"
        description="I think about stuff, I desing it, and then I build it."
      />
      <TeamHoverCard
        trigger="@nick"
        img="/assets/Avatar/Team/nick.svg"
        description="I'm a dog person, I like to code and design stuff."
      />
    </div>
  </div>
);

export default AboutPage;
