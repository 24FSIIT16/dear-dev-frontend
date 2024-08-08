'use client';

import * as React from 'react';
import { useAuth } from '@providers/AuthProvider';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@components/ui/AltertDialog/AlertDialog';
import { Button } from '@components/ui/Buttons/Button';
import Separator from '@components/ui/Separator/Separator';
import useUserClient from '@hooks/useUserClient';

const AccountPage: React.FC = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const { deleteUser } = useUserClient();

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      router.replace('/login');
    } catch (error) {
      console.warn('Error: ', error);
    }
  };

  return (
    <AlertDialog>
      <div className="space-y-4">
        <div className="space-y-1">
          <h2>Delete account</h2>
          <p className="text-sm font-thin">Delete your yappi account permanently.</p>
        </div>
        <Separator className="mt-2" />
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete account</Button>
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h3>Are you sure?</h3>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-sm font-thin">Deleting your account is irreversible. All your data will be lost.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountPage;
