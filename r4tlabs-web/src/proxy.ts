import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Get hostname of request (e.g. auth.r4tlabs.com, r4tlabs.com)
  const hostname = req.headers.get('host') || '';

  const authDomain = process.env.AUTH_DOMAIN || 'auth.localhost:3000';

  // If the request is for the auth domain, rewrite to the /auth directory
  if (hostname === authDomain || hostname.startsWith('auth.')) {
    // Evitar loop infinito si ya está en /auth
    if (!url.pathname.startsWith('/auth')) {
      url.pathname = `/auth${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
