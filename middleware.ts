import authConfig from 'auth.config';
import NextAuth from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((request: NextRequest) => {
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  if (!request.auth && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
