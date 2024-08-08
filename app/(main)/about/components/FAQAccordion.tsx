import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion';
import * as React from 'react';

const FAQAccordion: React.FC = () => (
  <Accordion type="multiple" className="text-md w-160 font-thin">
    <AccordionItem value="item-1">
      <AccordionTrigger>How is my data stored & secured?</AccordionTrigger>
      <AccordionContent>
        We prioritize your data security by implementing industry-standard encryption protocols. Our servers are secured
        with the latest security measures, including firewalls, regular security audits, and monitoring to ensure your
        data is protected.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>What personal information do you collect?</AccordionTrigger>
      <AccordionContent>
        We collect only the information necessary to provide our services, such as your name, email address, happiness
        scores, and usage data.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Who can see my data?</AccordionTrigger>
      <AccordionContent>
        Your data is private and only accessible to you. Your submissions will be aggregated at the team level and
        shared within the team. At no time will we share detailed personal information that can be used to connect you
        to the team averages. We do not share your personal data with third parties without your consent. Our team
        follows strict privacy protocols to ensure your information remains confidential.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4">
      <AccordionTrigger>How can I delete my account?</AccordionTrigger>
      <AccordionContent>
        To delete your account, go to your account settings and follow the instructions for account deletion. Once
        deleted, all your data will be permanently removed from our servers. If you need assistance, please contact our
        support team.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-5">
      <AccordionTrigger>Is Yappi free?</AccordionTrigger>
      <AccordionContent>Yes, our service is free for all users.</AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-6">
      <AccordionTrigger>What should I do if I encounter a bug or issue?</AccordionTrigger>
      <AccordionContent>
        If you experience any bugs or issues, please report them to our support team via our{' '}
        <a href="about/contact" className="text-blue-600 hover:underline">
          Contact & Support page
        </a>{' '}
        page or{' '}
        <a href="https://discord.gg/XhsmFHnhBF" className="text-blue-600 hover:underline">
          Discord channel
        </a>{' '}
        . Provide as much detail as possible so we can address the problem quickly and effectively.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default FAQAccordion;
