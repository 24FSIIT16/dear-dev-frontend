import * as React from 'react';
import Link from 'next/link';
import Logo from '@components/ui/Logo/Logo';
import { Button } from '@components/ui/Buttons/Button';
import { CircleArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => (
  <div className="flex h-screen items-center justify-center bg-primaryRed-bg">
    <div className="flex flex-col rounded-2xl bg-white shadow-2xl dark:bg-white">
      <div className="p-12">
        <div className="flex justify-end">
          <Logo className="mb-4 h-6 w-6" />
        </div>
        <h1 className="font-normal text-black">Oops!</h1>
        <h3 className="font-thin text-black">We couldn&apos;t find the page you were looking for.</h3>
        <Link href="/">
          <Button variant="outline" className="mt-4 text-xs font-normal">
            <CircleArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
