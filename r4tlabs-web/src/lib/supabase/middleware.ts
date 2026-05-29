import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, responseToModify?: NextResponse) {
  let supabaseResponse = responseToModify || NextResponse.next({
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
            request.cookies.set(name, value)
          })
          
          // Clonamos la respuesta original en lugar de crear un Next.js nuevo
          supabaseResponse = NextResponse.next({
            request,
          })
          if (responseToModify) {
             // Preserve rewrite headers if we had a rewrite
             responseToModify.headers.forEach((value, key) => {
                 supabaseResponse.headers.set(key, value)
             })
          }
          
          cookiesToSet.forEach(({ name, value, options }) => {
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

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith('/auth/admin') || pathname.startsWith('/admin')
  const isLoginPage = pathname === '/auth/admin/login' || pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Verify admin email
    if (user.email !== process.env.ADMIN_EMAIL) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('error', 'AccessDenied')
      return NextResponse.redirect(url)
    }
  }

  if (isLoginPage && user && user.email === process.env.ADMIN_EMAIL) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
