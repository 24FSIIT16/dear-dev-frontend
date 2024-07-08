import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import AboutAccordion from './components/AboutAccordion';
import TeamHoverCard from './components/TeamHoverCard';
import ContactForm from './components/ContactForm';

const AboutPage: React.FC = () => (
  <div>
    <AboutAccordion />
    <div className="mt-8 space-y-1">
      <h2>Team</h2>
      <p className="text-sm font-thin">Team behind yappi.</p>
    </div>
    <div className="mt-4 flex w-64 flex-row justify-between">
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
    <Separator className="my-8" />
    <div className="space-y-4">
      <div className="space-y-1">
        <h2>Contact</h2>
        <p className="text-sm font-thin">Do you have any questions? - Get in touch.</p>
      </div>
      <ContactForm />
    </div>
  </div>
);

export default AboutPage;
