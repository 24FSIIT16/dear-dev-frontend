import * as React from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/Buttons/Button';
import { User, Settings, LogOut, LifeBuoyIcon, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@components/ui/DropdownMenu/Dropdown-menu';
import { signOut } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@components/ui/AltertDialog/AlertDialog';
import { useAuth } from '@providers/AuthProvider';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/Dialog/Dialog';
import JoinTeamDialog from '@/(onboarding)/onboarding/components/JoinTeamDialog';

const Account: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-48">
            <DropdownMenuLabel className="text-sm">
              <p>{user ? `${user?.name}` : 'My Account'}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Join team</span>
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/contact">
                  <div className="flex items-center">
                    <LifeBuoyIcon className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/appearance">
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <h3>Are you sure?</h3>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-xs font-thin">Log out of your yappi account.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8">Cancel</AlertDialogCancel>
            <AlertDialogAction className="h-8" onClick={handleLogout}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DialogContent>
        <JoinTeamDialog />
      </DialogContent>
    </Dialog>
  );
};

export default Account;
