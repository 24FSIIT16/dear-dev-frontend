import { auth } from './auth';

export default async function SessionInfo() {
  const session = await auth();

  return (
    <div>
      <p>{session?.user?.name}</p>
    </div>
  );
}
