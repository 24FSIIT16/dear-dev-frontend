import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import FAQAccordion from '../components/FAQAccordion';

const FAQPage: React.FC = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h2>FAQs</h2>
      <p className="text-sm font-thin">Have questions about yappi and how to use it?</p>
    </div>
    <Separator className="mt-2" />
    <FAQAccordion />
  </div>
);

export default FAQPage;
