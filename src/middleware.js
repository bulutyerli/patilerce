import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/verifyemail')
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }

  if (
    pathname.startsWith('/profile') ||
    pathname.startsWith('/messages') ||
    pathname.startsWith('/askquestion')
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }
}
