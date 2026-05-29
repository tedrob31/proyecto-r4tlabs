import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const authDomain = process.env.AUTH_DOMAIN || 'auth.localhost:3000';

  let response: NextResponse | undefined;

  // Si la petición es para el dominio de auth, reescribimos internamente a /auth
  if (hostname === authDomain || hostname.startsWith('auth.')) {
    if (!url.pathname.startsWith('/auth')) {
      url.pathname = `/auth${url.pathname}`;
      response = NextResponse.rewrite(url, { request });
    }
  }

  return await updateSession(request, response)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth/callback (Supabase OAuth callback)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth/callback).*)',
  ],
}
