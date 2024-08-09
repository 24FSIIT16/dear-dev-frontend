import * as React from 'react';
import cn from '@/lib/utils';
import Link from 'next/link';
import { LogOut, RefreshCcw } from 'lucide-react';
import { Button } from '@components/ui/Buttons/Button';
import Separator from '@components/ui/Separator/Separator';
import { signOut } from 'next-auth/react';

interface ErrorProps {
  className?: string;
  errorMessage: string;
  action?: string;
  showContact: boolean;
}

const Error: React.FC<ErrorProps> = ({ className, errorMessage, action, showContact = false }) => {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className={cn('flex items-center justify-center pt-40 text-black dark:text-white', className)}>
      <div className="flex flex-col">
        <h1>Oops, something went wrong!</h1>
        <p className="text-md font-thin">{errorMessage}</p>
        {action && (
          <div className="mt-4 flex flex-row items-center space-x-4">
            <Link href={action}>
              <Button variant="outline" className="text-xs font-normal">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            </Link>
            <Separator className="h-8" orientation="vertical" />
            <Button variant="outline" className="text-xs font-normal" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
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
};

export default Error;
