import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = await request.cookies.get('token')?.value;

  if (token && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!token && path.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup'],
};
