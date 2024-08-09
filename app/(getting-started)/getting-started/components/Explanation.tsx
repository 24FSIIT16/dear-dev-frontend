import * as React from 'react';
import Link from 'next/link';
import Separator from '@components/ui/Separator/Separator';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExplanationProps {
  number: string;
  title: string;
  content: React.ReactNode;
  hrefPrevious?: string;
  hrefNext?: string;
  labelPrevious?: string;
  labelNext?: string;
}

const Explanation: React.FC<ExplanationProps> = ({
  number,
  title,
  content,
  hrefPrevious,
  hrefNext,
  labelPrevious,
  labelNext,
}) => (
  <div className="space-y-4">
    <div className="flex flex-row items-center justify-between">
      <div className="flex-1" />
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primaryBlue-light p-1 text-2xl font-bold text-primaryBlue-main">
        {number}
      </div>
    </div>
    <h2>{title}</h2>
    <div className="text-md font-light">{content}</div>
    <div>
      <Separator className="my-8" />
      <div className="flex flex-row items-center justify-between">
        {hrefPrevious ? (
          <Link href={hrefPrevious}>
            <div className="flex flex-row items-center gap-4">
              <ChevronLeft className="h-4 w-4" />
              <div className="flex flex-col">
                <p className="text-xs font-extralight">Previous</p>
                <p className="text-md font-light">{labelPrevious}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {hrefNext && (
          <Link href={hrefNext}>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col">
                <p className="text-xs font-extralight">Next</p>
                <p className="text-md font-light">{labelNext}</p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default Explanation;
