import * as React from 'react';
import { Laugh, Smile, Annoyed, Frown } from 'lucide-react';
import Explanation from '../components/Explanation';

const HappinessDataPage: React.FC = () => (
  <Explanation
    number="2"
    title="Understanding Happiness Data"
    content={
      <section className="space-y-4">
        <p>
          yappi provides various scores to help you track your performance and happiness. Here&apos;s a quick guide to
          understanding them:
        </p>
        <ul className="list-inside space-y-2">
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Overall Happiness Score</p>
              <p>A measure of your overall well-being based on your interactions and activities.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Happiness Score by Type of Work</p>
              <p>Your happiness score is tied to four easily recognizable smileys that reflect your mood.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Team Sync Score</p>
              <p>Indicates how well you are aligning with your team’s objectives and dynamics.</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col space-y-0.5">
              <p className="font-semibold">Tracking Emotions</p>
              <p>
                yappi tracks a range of emotions to provide insights into your emotional state. By analyzing these
                patterns, you can better understand your emotional triggers and work towards a more balanced emotional
                state. This includes tracking how different tasks affect your mood and identifying trends over time.
              </p>
            </div>
          </li>
        </ul>
        <p>Your happiness scores are tied to four easily recognizable smileys that reflect your mood and represent:</p>
        <ul className="list-inside list-disc space-y-2">
          <li className="flex items-center space-x-2">
            <Laugh className="h-8 w-8" />
            <span>20 points</span>
          </li>
          <li className="flex items-center space-x-2">
            <Smile className="h-8 w-8" />
            <span>14 points</span>
          </li>
          <li className="flex items-center space-x-2">
            <Annoyed className="h-8 w-8" />
            <span>8 points</span>
          </li>
          <li className="flex items-center space-x-2">
            <Frown className="h-8 w-8" />
            <span>2 points</span>
          </li>
        </ul>
        <p>
          Behind these smileys is a point system that quantifies your mood and activities. Please note that the grading
          is currently in a test phase and will be adjusted as soon as the field testing is evaluated.
        </p>
      </section>
    }
    hrefPrevious="/getting-started"
    labelPrevious="Welcome"
    hrefNext="/getting-started/patterns"
    labelNext="Happiness Patterns"
  />
);

export default HappinessDataPage;
