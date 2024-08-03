'use client';

import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/NavigationMenu/Navigation-menu';
import ListItem from '@components/NavigationMenu/ListItem';

const resourcesItems = [
  {
    title: 'Getting Started',
    href: '/getting-started',
    description: 'Learn the basics to get started with our platform.',
  },
  { title: 'Support', href: '/about/contact', description: 'Get help and find support for any issues.' },
  {
    title: 'Literature Collection',
    href: 'https://www.zotero.org/groups/5617553/yappi/collections/VSEFDQFA',
    description: 'Access the latest research on productivity, happiness & developer work days',
    external: true,
  },
  {
    title: 'Yappi Community',
    href: 'https://discord.gg/XhsmFHnhBF',
    description: 'Join our discord community and connect with others.',
    external: true,
  },
];

const HeaderNavigationMenu: React.FC = () => (
  <div className="start flex items-center space-x-4">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {resourcesItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href} external={item.external}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

export default HeaderNavigationMenu;
