/* eslint-disable no-param-reassign */
import NextAuth, { Session } from 'next-auth';
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from 'pg';
import authConfig from 'auth.config';
import jwt from 'jsonwebtoken';

interface ExtendedSession extends Session {
  accessToken?: string;
}

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      if (!extendedSession.user) {
        extendedSession.user = { id: '', name: '', email: '' };
      }
      extendedSession.user.id = token.id as string;
      extendedSession.accessToken = jwt.sign(token, process.env.JWT_SECRET as string, { algorithm: 'HS256' });
      return extendedSession;
    },
  },
  ...authConfig,
  secret: process.env.SECRET,
});
