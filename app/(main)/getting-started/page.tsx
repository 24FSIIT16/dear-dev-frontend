import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import { Annoyed, Frown, Laugh, Smile } from 'lucide-react';

const GettingStartedPage: React.FC = () => (
  <div className="space-y-6 p-4 md:p-8">
    <section className="space-y-1">
      <h2 className="text-xl font-semibold">Where Productivity Meets Happiness</h2>
      <p className="text-sm font-light">
        Discover a new way to track your happiness and boost your productivity. yappi helps you monitor your emotional
        well-being, learn from your experiences, and achieve greater efficiency in your daily life. Join us now and take
        the first step towards a happier, more productive you.
      </p>
    </section>

    <Separator className="mt-2" />

    <section className="space-y-1">
      <h3 className="text-xl font-semibold">Understanding Happiness Data</h3>
      <p className="text-sm font-light">
        Yappi provides various scores to help you track your performance and happiness. Here&apos;s a quick guide to
        understanding them:
      </p>
      <ul className="list-disc pl-5 text-sm font-light">
        <li>
          <strong>Overall Happiness Score:</strong> A measure of your overall well-being based on your interactions and
          activities.
        </li>
        <li>
          <strong>Happiness Score by Type of Work:</strong> Your happiness score is tied to four easily recognizable
          smileys that reflect your mood:
        </li>
        <li>
          <strong>Team Sync Score:</strong> Indicates how well you are aligning with your team’s objectives and
          dynamics.
        </li>
        <li>
          <strong>Tracking Emotions:</strong> Yappi tracks a range of emotions to provide insights into your emotional
          state. By analyzing these patterns, you can better understand your emotional triggers and work towards a more
          balanced emotional state. This includes tracking how different tasks affect your mood and identifying trends
          over time.
        </li>
        <br />
        Your happiness scores are tied to four easily recognizable smileys that reflect your mood:
        <ul className="mt-1 list-disc pl-5">
          <li className="flex items-center space-x-2">
            <Laugh className="h-6 w-6" />
            <span>Represents 20 points.</span>
          </li>
          <li className="flex items-center space-x-2">
            <Smile className="h-6 w-6" />
            <span>Represents 14 points.</span>
          </li>
          <li className="flex items-center space-x-2">
            <Annoyed className="h-6 w-6" />
            <span>Represents 8 points.</span>
          </li>
          <li className="flex items-center space-x-2">
            <Frown className="h-6 w-6" />
            <span>Represents 2 points.</span>
          </li>
        </ul>
        <br />
        Behind these smileys is a point system that quantifies your mood and activities. Please note that the grading is
        currently in a test phase and will be adjusted as soon as the field testing is evaluated.
      </ul>
    </section>

    <Separator className="mt-2" />

    <section className="space-y-1">
      <h3 className="text-xl font-semibold">Discovering Happiness Patterns</h3>
      <p className="text-sm font-light">
        Yappi helps you uncover patterns in your happiness data to make informed decisions:
      </p>
      <ul className="list-disc pl-5 text-sm font-light">
        <li>
          <strong>Positive Trends:</strong> Identify the activities and interactions that consistently boost your mood.
          Use these insights to prioritize tasks and relationships that contribute to your well-being.
        </li>
        <li>
          <strong>Team Dynamics:</strong> Understand how your mood aligns with your team. This can help in improving
          teamwork and communication, fostering a more collaborative environment.
        </li>
        <li>
          <strong>Areas for Improvement:</strong> Pinpoint areas that negatively impact your happiness. Use this
          information to make necessary changes, whether it’s in your work habits or personal life.
        </li>
      </ul>
    </section>

    <Separator className="mt-2" />

    <section className="space-y-1">
      <h3 className="text-xl font-semibold">Settings and Customizations</h3>
      <p className="text-sm font-light">
        Tailor your Yappi experience by adjusting the settings to fit your preferences. Here&apos;s how you can
        customize your settings:
      </p>
      <ul className="list-disc pl-5 text-sm font-light">
        <li>
          <strong>Profile Settings:</strong> Update your personal information and preferences in the{' '}
          <a href="/settings" className="text-blue-600 hover:underline">
            Settings menu
          </a>{' '}
          .
        </li>
        <li>
          <strong>Notification Preferences:</strong> Manage your notification settings to stay updated without
          distractions. (currently not available)
        </li>
        <li>
          <strong>Dashboard Layout:</strong> Customize your dashboard to prioritize the information that matters most to
          you. (currently not available)
        </li>
        <li>
          <strong>Integrate Productivity Tools:</strong> (currently not available)
        </li>
      </ul>
    </section>

    <Separator className="mt-2" />

    <section className="space-y-1">
      <h3 className="text-xl font-semibold">Usage Tips</h3>
      <p className="text-sm font-light">Here are some tips to help you make the most of Yappi:</p>
      <ul className="list-disc pl-5 text-sm font-light">
        <li>
          <strong>Regular Check-Ins:</strong> Make it a habit to review your scores and insights regularly to track your
          progress.
        </li>
        <li>
          <strong>Set Goals:</strong> Use Yappi’s goal-setting feature to keep your focus sharp and your productivity on
          track. (currently not available)
        </li>
        <li>
          <strong>Engage with Your Team:</strong> Collaborate with your team to boost your Team Sync Score and achieve
          collective goals. (currently not available)
        </li>
      </ul>
    </section>

    <Separator className="mt-2" />

    <section className="space-y-1">
      <h3 className="text-xl font-semibold">FAQ & Support</h3>
      <p className="text-sm font-light">
        Have questions? Visit our{' '}
        <a href="/about/contact" className="text-blue-600 hover:underline">
          Support Page
        </a>{' '}
        for assistance or check out our{' '}
        <a href="/about/FAQ" className="text-blue-600 hover:underline">
          FAQ
        </a>{' '}
        for quick answers to common questions.
      </p>
    </section>
  </div>
);

export default GettingStartedPage;
