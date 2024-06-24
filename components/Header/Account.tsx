import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@components/ui/DropdownMenu/Dropdown-menu';

const Account: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <User className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Account;
