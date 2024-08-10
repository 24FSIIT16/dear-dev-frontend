import * as React from 'react';
import { NavigationMenuLink } from '@components/ui/NavigationMenu/Navigation-menu';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { external?: boolean }>(
  // eslint-disable-next-line react/prop-types
  ({ className, title, children, external, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondaryBG-light dark:hover:bg-secondaryBG-dark dark:hover:text-primaryBG-light ${className}`}
          target={external ? '_blank' : '_self'}
          rel={external ? 'noopener noreferrer' : undefined}
          {...props}
        >
          <h3>{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm font-light leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
);

ListItem.displayName = 'ListItem';

export default ListItem;
