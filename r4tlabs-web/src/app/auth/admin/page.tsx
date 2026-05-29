import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { CheckCircle2, XCircle, Clock, Database, Users } from "lucide-react";
import { redirect } from "next/navigation";

// Forzar revalidación dinámica para que siempre muestre datos frescos
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Seguridad: Verificar si hay sesión y si el email coincide con el ADMIN_EMAIL
  const adminEmail = process.env.ADMIN_EMAIL || "admin@r4tlabs.com";
  if (!user || user.email !== adminEmail) {
    redirect("/auth/admin/login?error=AccessDenied");
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy";
  
  // Cliente de administrador para listar usuarios de Auth
  const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseKey);
  
  // Obtenemos todos los usuarios desde Supabase Auth
  const { data: authData, error } = await supabaseAdmin.auth.admin.listUsers();
  const users = authData?.users || [];

  const totalUsers = users.length;
  const connectedUsers = users.filter(u => u.user_metadata?.provider_refresh_token).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Clientes</h1>
        <p className="text-neutral-400 mt-1">Supervisa los accesos y tokens de Google Drive de tus clientes B2B registrados centralmente.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-16 h-16 text-blue-500" />
          </div>
          <p className="text-neutral-400 text-sm font-medium mb-1">Total Clientes</p>
          <p className="text-4xl font-bold text-white">{totalUsers}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Database className="w-16 h-16 text-green-500" />
          </div>
          <p className="text-neutral-400 text-sm font-medium mb-1">Tokens Activos</p>
          <p className="text-4xl font-bold text-white">{connectedUsers}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 text-neutral-400 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Cliente / Email</th>
                <th className="px-6 py-4 text-center">Estado G-Drive</th>
                <th className="px-6 py-4">ID de Supabase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {error ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-red-400">
                    Error al conectar con Supabase. Verifica tus variables de entorno.
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">
                    Aún no hay clientes registrados.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const hasToken = !!u.user_metadata?.provider_refresh_token;
                  const name = u.user_metadata?.full_name || u.user_metadata?.name || "Sin nombre";
                  const avatarUrl = u.user_metadata?.avatar_url || u.user_metadata?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.email || 'U')}&background=0D8ABC&color=fff`;
                  
                  return (
                    <tr key={u.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={avatarUrl} 
                            alt={u.email} 
                            className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-800"
                          />
                          <div>
                            <p className="text-white font-medium">{name}</p>
                            <p className="text-neutral-400 text-xs">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {hasToken ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Conectado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                              <XCircle className="w-3.5 h-3.5" />
                              Sin Token
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs text-neutral-500 bg-neutral-950 px-2 py-1 rounded font-mono">
                          {u.id}
                        </code>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
