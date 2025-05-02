import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const path = request.nextUrl.pathname;

  // If user is logged in and trying to access login page -> redirect to home
  if (accessToken && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/employer/home', request.url));
  }

  // If user is NOT logged in and trying to access employer routes -> redirect to login
  if (!accessToken && path.startsWith('/employer')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Only match these routes
export const config = {
  matcher: [
    '/login',
    '/employer/:path*', 
  ],
};
