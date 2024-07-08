import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion';
import * as React from 'react';

const AboutAccordion: React.FC = () => (
  <Accordion type="multiple" collapsible className="text-md w-60 font-thin">
    <AccordionItem value="item-1">
      <AccordionTrigger>Where is yappi coming from?</AccordionTrigger>
      <AccordionContent>Blablabla...</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Idea behind yappi</AccordionTrigger>
      <AccordionContent>Blablabla...</AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default AboutAccordion;
