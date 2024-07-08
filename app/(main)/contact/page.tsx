import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import ContactForm from './components/ContactForm';
import FAQAccordion from './components/FAQAccordion';

const ContactPage: React.FC = () => (
  <div className="space-y-6">
    <div className="space-y-1">
      <h2>Contact Us</h2>
      <p className="text-sm font-thin">We try to response to every question.</p>
    </div>
    <ContactForm />
    <Separator />
    <div className="space-y-1">
      <h2>FAQs</h2>
      <p className="text-sm font-thin">Have questions about yappi and how to use it?</p>
    </div>
    <FAQAccordion />
  </div>
);

export default ContactPage;
