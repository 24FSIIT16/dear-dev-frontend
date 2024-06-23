import Logo from '@components/ui/Logo/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Logo />
      <p className="text-xl">Welcome to yappi</p>
    </main>
  );
}
