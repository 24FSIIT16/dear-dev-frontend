import * as React from 'react';
import Separator from '@components/ui/Separator/Separator';
import Icons from '@components/ui/Icons/Icons';
import Link from 'next/link';

const ContributePage: React.FC = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h2>Contribute</h2>
      <p className="text-sm font-thin">yappi is build as an open-source project.</p>
    </div>
    <Separator className="mt-2" />
    <div className="flex flex-col items-start">
      <p className="text-md font-thin">
        If you want to contribute to yappi, feel free to check out our GitHub repository.
      </p>
      <Link
        rel="noopener noreferrer"
        href="https://github.com/24FSIIT16"
        target="_blank"
        className="mt-2 underline underline-offset-4"
      >
        <div className="flex items-center justify-center">
          <Icons.GITHUB className="mr-2 h-4 w-4" />
          GitHub
        </div>
      </Link>
    </div>
  </div>
);

export default ContributePage;
