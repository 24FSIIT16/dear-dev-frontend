import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { signIn } from 'next-auth/react';
import Icons from '@components/ui/Icons/Icons';
import Separator from '@components/ui/Separator/Separator';
import cn from '@/lib/utils';

interface UserAuthFormProps {
  className?: string;
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ className }) => {
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setLoadingProvider(provider);
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing in: ', error);
    }
    setLoadingProvider(null);
  };

  return (
    <div className={cn('flex min-h-screen items-center justify-center', className)}>
      <div className="grid max-w-sm gap-3 text-center">
        <h1>Get started with yappi</h1>
        <p className="mb-2 text-xs font-thin">Sign in with Google or GitHub to start your happiness journey.</p>
        <Button
          className="h-8"
          variant="outline"
          type="button"
          disabled={loadingProvider === 'github'}
          onClick={() => handleLogin('github')}
        >
          {loadingProvider === 'github' ? (
            <Icons.SPINNER className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.GITHUB className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
        <div className="my-1 flex items-center">
          <Separator className="flex-1" />
          <span className="mx-2 text-xs font-light">OR</span>
          <Separator className="flex-1" />
        </div>
        <Button
          className="h-8"
          variant="outline"
          type="button"
          disabled={loadingProvider === 'google'}
          onClick={() => handleLogin('google')}
        >
          {loadingProvider === 'google' ? (
            <Icons.SPINNER className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.GOOGLE className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </div>
    </div>
  );
};

export default UserAuthForm;
