import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // next is the URL to redirect to after successful login
  const next = searchParams.get('next') ?? '/auth/admin'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const isExternal = next.startsWith('http://') || next.startsWith('https://')
      
      if (isExternal) {
        // Redirigir a otro dominio, anexando el email como identificador (temporal)
        const nextUrl = new URL(next)
        if (data.user?.email) {
          nextUrl.searchParams.set('user_email', data.user.email)
        }
        return NextResponse.redirect(nextUrl.toString())
      } else {
        // Redirigir internamente
        return NextResponse.redirect(`${origin}${next.startsWith('/') ? next : `/${next}`}`)
      }
    }
  }

  // Si hay error, redirigimos al login con error
  return NextResponse.redirect(`${origin}/auth/login?error=AuthFailed`)
}
