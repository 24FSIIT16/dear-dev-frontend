import * as React from 'react';
import { NavigationMenuLink } from '@components/ui/NavigationMenu/Navigation-menu';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { external?: boolean }>(
  // eslint-disable-next-line react/prop-types
  ({ className, title, children, external, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 ${className}`}
          target={external ? '_blank' : '_self'}
          rel={external ? 'noopener noreferrer' : undefined}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
);

ListItem.displayName = 'ListItem';

export default ListItem;
