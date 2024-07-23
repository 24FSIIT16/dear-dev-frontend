import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h2>Contact us</h2>
      <p className="text-sm font-thin">Do you have any questions or need support?</p>
    </div>
    <Separator className="mt-2" />
    <ContactForm />
  </div>
);

export default ContactPage;
