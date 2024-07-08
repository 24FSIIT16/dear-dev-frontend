import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import Icons from '@components/ui/Icons/Icons';
import Link from 'next/link';
import TeamHoverCard from './components/TeamHoverCard';

const AboutPage: React.FC = () => (
  <div>
    <div className="space-y-6">
      <div className="mt-8 space-y-1">
        <h2>Team</h2>
        <p className="text-sm font-thin">The people behind yappi.</p>
      </div>
      <div className="flex w-64 flex-row justify-between">
        <TeamHoverCard
          trigger="@petra"
          img="/assets/Avatar/Team/petra.svg"
          mail="petra.kohler@students.fhnw.ch"
          description="I think about stuff, I desing it, and then I build it."
        />
        <TeamHoverCard
          trigger="@nick"
          img="/assets/Avatar/Team/nick.svg"
          mail="nick.baur@students.fhnw.ch"
          description="I'm a dog person, I like to code and design stuff."
        />
      </div>
    </div>
    <Separator className="my-8" />
    <div className="space-y-6">
      <div className="space-y-1">
        <h2>Contribute</h2>
        <p className="text-sm font-thin">yappi is build as an open-source project.</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-md font-thin">
          If you want to contribute to yappi, feel free to check out our GitHub repository.
        </p>
        <Link
          rel="noopener noreferrer"
          href="https://github.com/24FSIIT16"
          target="_blank"
          className="mt-2 underline underline-offset-4"
        >
          <div className="flex items-center justify-center">
            <Icons.GITHUB className="mr-2 h-4 w-4" />
            GitHub
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default AboutPage;
