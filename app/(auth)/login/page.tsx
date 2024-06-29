import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { signIn } from '@/(main)/auth';

const Login: React.FC = () => (
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

        await signIn('google');
      }}
    >
      <Button>Sign in with Google</Button>
    </form>
  </div>
);

export default Login;
