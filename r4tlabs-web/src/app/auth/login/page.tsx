"use client";

import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { Fingerprint, AlertCircle } from "lucide-react";

export default function UniversalLogin() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const scopes = searchParams.get("scopes");
  const error = searchParams.get("error");

  const handleLogin = async () => {
    const supabase = createClient();
    
    // Configurar redirección
    const redirectUrl = new URL("/api/auth/callback", window.location.origin);
    redirectUrl.searchParams.set("next", next);

    // Preparar opciones de autenticación
    const options: any = {
      redirectTo: redirectUrl.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    };

    // Si se solicitaron permisos extra (scopes), los añadimos
    if (scopes) {
      options.scopes = scopes;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Decors */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-neutral-800 flex items-center justify-center rounded-2xl border border-neutral-700 mb-6 shadow-lg">
              <Fingerprint className="w-8 h-8 text-neutral-300" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Central de Accesos</h1>
            <p className="text-neutral-400 text-sm px-4">
              Inicia sesión con Google para acceder a los servicios de la red R4TLABS.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">
                Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full h-12 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          {scopes && (
            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <p className="text-xs text-neutral-500">
                Esta aplicación está solicitando permisos adicionales de integración.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
