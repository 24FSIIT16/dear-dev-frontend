import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion';
import * as React from 'react';

const FAQAccordion: React.FC = () => (
  <Accordion type="multiple" className="text-md w-60 font-thin">
    <AccordionItem value="item-1">
      <AccordionTrigger>What is yappi?</AccordionTrigger>
      <AccordionContent>Blablabla...</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is yappi free?</AccordionTrigger>
      <AccordionContent>Blablabla...</AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default FAQAccordion;
