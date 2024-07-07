import * as React from 'react';
import cn from '@/lib/utils';
import Icons from '@components/ui/Icons/Icons';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => (
  <div className={cn('flex items-center justify-center text-black dark:text-white', className)}>
    <Icons.SPINNER className="h-8 w-8 animate-spin" />
  </div>
);

export default Loading;
