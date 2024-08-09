import * as React from 'react';
import Explanation from './components/Explanation';

const GettingStartedPage: React.FC = () => (
  <Explanation
    number="1"
    title="Welcome to yappi"
    content="Discover a new way to track your happiness and boost your productivity. yappi helps you monitor your emotional
            well-being, learn from your experiences, and achieve greater efficiency in your daily life. Join us now and take
            the first step towards a happier, more productive you."
    hrefNext="/getting-started/happiness"
    labelNext="Happiness Data"
  />
);

export default GettingStartedPage;
