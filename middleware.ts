import authConfig from 'auth.config';
import NextAuth from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);

// const trustedHosts = process.env.TRUSTED_HOSTS?.split(',') ?? [];

// console.log(trustedHosts);

interface AuthRequest extends NextRequest {
  auth?: {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
  };
}

const verifySession = (request: AuthRequest): boolean => {
  if (request.auth) {
    return true;
  }
  return false;
};

export default auth((request: NextRequest) => {
  // const host = request.headers.get('host');
  //
  // console.log('host', host);
  //
  // if (!host) {
  //   console.log('tri');
  //   return new NextResponse('Host header is missing', { status: 400 });
  // }
  //
  // if (!trustedHosts.includes(host)) {
  //   console.log('trsdfsfi');
  //
  //   return new NextResponse('Untrusted Host', { status: 403 });
  // }

  const sessionValid = verifySession(request);

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  if (!sessionValid && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
