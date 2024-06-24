import { Button } from '@components/ui/Buttons/Button';
import * as React from 'react';
import { User, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@components/ui/DropdownMenu/Dropdown-menu';

const Account: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <User className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className="flex items-center">
          <User className="mr-2 h-3 w-3" />
          <p>Profile</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div className="flex items-center">
          <Settings className="mr-2 h-3 w-3" />
          <p>Settings</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="my-1 hover:bg-transparent hover:text-inherit focus:bg-transparent focus:text-inherit">
        <Button variant="destructive" size="sm" className="w-full font-outfit text-xs font-light">
          Logout
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Account;
