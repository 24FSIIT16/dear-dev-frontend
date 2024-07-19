import { Button } from '@components/ui/Buttons/Button';
import Logo from '@components/ui/Logo/Logo';
import * as React from 'react';
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
import Link from 'next/link';

const OnboardingHeader: React.FC = () => {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <AlertDialog>
      <Link href="/">
        <Logo className="flex h-8 w-8 flex-1" />
      </Link>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Log out</Button>
      </AlertDialogTrigger>
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
  );
};

export default OnboardingHeader;
