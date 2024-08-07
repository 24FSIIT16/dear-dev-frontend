import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
        destructive: 'bg-primaryRed-main text-slate-50 hover:bg-red-500/90 py-1',
        outline:
          'border border-input border-slate-200 bg-white hover:bg-tertiaryBG-light focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:bg-primaryBG-dark dark:border-secondaryBG-dark dark:hover:bg-secondaryBG-dark',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost: 'hover:bg-tertiaryBG-light hover:text-slate-900 dark:hover:bg-secondaryBG-dark dark:hover:text-slate-50',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        selected: 'bg-tertiaryBG-light dark:bg-secondaryBG-dark',
        icon: 'dark:hover:bg-secondaryBG-dark hover:bg-tertiaryBG-light',
        mood: 'rounded-3xl bg-tertiaryBG-light hover:bg-slate-50 text-black hover:text-black p-4',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: '<h-7></h-7> rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-8 w-8',
        survey: 'h-12 w-12',
        navigation: 'h-10 w-10',
        mood: 'h-28 w-28',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
