import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isVerified = token?.user?.isVerified;
  const pathname = req.nextUrl.pathname;
  const isAdmin = token?.user?.isAdmin;
  const isBanned = token?.user?.isBanned;

  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }
  if (pathname.startsWith('/adopt/listing')) {
    if (!isVerified && isAuthenticated) {
      return NextResponse.redirect(new URL('/not-verified-email', req.url));
    }
  }

  if (pathname.startsWith('/control-center')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (
    pathname.startsWith('/profile') ||
    pathname.startsWith('/messages') ||
    pathname.startsWith('/community/ask-question') ||
    pathname.startsWith('/adopt/listing')
  ) {
    if (isBanned) {
      return NextResponse.redirect(new URL('/banned', req.url));
    }
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
}
