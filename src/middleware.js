import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isVerified = token.isVerified;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }
  if (pathname.startsWith('/adopt/listing')) {
    if (!isVerified && isAuthenticated) {
      return NextResponse.redirect(
        new URL('/profile/not-verified-email', req.url)
      );
    }
  }

  if (
    pathname.startsWith('/profile') ||
    pathname.startsWith('/messages') ||
    pathname.startsWith('/ask-question') ||
    pathname.startsWith('/adopt/listing')
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
}
