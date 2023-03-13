import { Session } from 'next-auth';

export async function getSession(): Promise<Session> {
  const response = await fetch('/api/session');
  const session = (await response.json()) as Session;
  return session;
}
