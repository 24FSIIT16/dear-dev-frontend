import * as React from 'react';
import { signIn, signOut } from '@/auth';
import { Button } from '@components/ui/Buttons/Button';
import SessionInfo from './SessionInfo';

const Home: React.FC = () => (
  <div className="flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center space-y-2">
    <form
      action={async () => {
        'use server';

        await signIn('github');
      }}
    >
      <Button>Sign in with GitHub</Button>
    </form>

    <form
      action={async () => {
        'use server';

        await signOut();
      }}
    >
      <Button>SignOut</Button>
    </form>

    <form
      action={async () => {
        'use server';

        await signIn('google');
      }}
    >
      <Button>Sign in with Google</Button>
    </form>

    <SessionInfo />
  </div>
);

export default Home;
