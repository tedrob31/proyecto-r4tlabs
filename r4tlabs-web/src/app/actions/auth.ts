"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signInWithGoogleAction(nextUrl: string, scopes?: string | null) {
  const supabase = await createClient()
  
  // Usar AUTH_DOMAIN para construir la URL absoluta si está disponible, 
  // caso contrario, asumir que estamos en el entorno local
  const authDomain = process.env.AUTH_DOMAIN || 'auth.localhost:3000'
  const protocol = authDomain.includes('localhost') ? 'http' : 'https'
  const redirectUrl = new URL("/api/auth/callback", `${protocol}://${authDomain}`)
  
  redirectUrl.searchParams.set("next", nextUrl)

  const options: any = {
    redirectTo: redirectUrl.toString(),
    queryParams: {
      access_type: "offline",
      prompt: "consent",
    },
  }

  if (scopes) {
    options.scopes = scopes
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options,
  })

  if (data.url) {
    redirect(data.url)
  }
}
