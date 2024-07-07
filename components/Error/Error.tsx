import * as React from 'react';
import cn from '@/lib/utils';
import Link from 'next/link';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@components/ui/Buttons/Button';
import Separator from '@components/ui/Separator/Separator';

interface ErrorProps {
  className?: string;
  errorMessage: string;
  action?: string;
  showContact: boolean;
}

const Error: React.FC<ErrorProps> = ({ className, errorMessage, action, showContact = false }) => (
  <div
    className={cn('flex min-h-[calc(100vh-7rem)] items-center justify-center text-black dark:text-white', className)}
  >
    <div className="flex flex-col">
      <h1>Oops, something went wrong!</h1>
      <p className="text-md font-thin">{errorMessage}</p>
      {action && (
        <Link href={action}>
          <Button variant="outline" className="mt-4 text-xs font-normal">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </Link>
      )}
      {showContact && (
        <>
          <Separator className="my-3" />
          <p className="mt-2 text-sm font-thin">
            If the problem persists, please{' '}
            <Link href="/contact" className="hover:text-primary underline underline-offset-4">
              contact us
            </Link>
            .
          </p>
        </>
      )}
    </div>
  </div>
);

export default Error;
