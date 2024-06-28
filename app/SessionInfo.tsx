import { auth } from './auth';

export default async function SessionInfo() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  return (
    <div>
      <p>{session?.user?.name}</p>
    </div>
  );
}
