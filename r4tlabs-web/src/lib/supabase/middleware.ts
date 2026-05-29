import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Se actualizan las cookies en la solicitud para uso inmediato
            request.cookies.set(name, value)
          })
          
          supabaseResponse = NextResponse.next({
            request,
          })
          
          cookiesToSet.forEach(({ name, value, options }) => {
            // Se actualizan las cookies en la respuesta con el dominio
            supabaseResponse.cookies.set(name, value, {
              ...options,
              domain: '.r4tlabs.com'
            })
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/auth/admin')
  const isLoginPage = request.nextUrl.pathname === '/auth/admin/login'

  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/admin/login'
      return NextResponse.redirect(url)
    }

    // Verify admin email
    if (user.email !== process.env.ADMIN_EMAIL) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/admin/login'
      url.searchParams.set('error', 'AccessDenied')
      return NextResponse.redirect(url)
    }
  }

  if (isLoginPage && user && user.email === process.env.ADMIN_EMAIL) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
