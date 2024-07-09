import * as React from 'react';
import cn from '@/lib/utils';
import Icons from '@components/ui/Icons/Icons';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => (
  <div
    className={cn('flex min-h-[calc(100vh-7rem)] items-center justify-center text-black dark:text-white', className)}
  >
    <Icons.SPINNER className="h-8 w-8 animate-spin" />
  </div>
);

export default Loading;
