import { createClient } from "@supabase/supabase-js";
import { CheckCircle2, XCircle, Clock, Database, Users } from "lucide-react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Forzar revalidación dinámica para que siempre muestre datos frescos
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  // Seguridad: Verificar si hay sesión y si el email coincide con el ADMIN_EMAIL
  const adminEmail = process.env.ADMIN_EMAIL || "admin@r4tlabs.com";
  if (!session || !session.user || session.user.email !== adminEmail) {
    redirect("/admin/login?error=AccessDenied");
  }
  const supabaseUrl = process.env.SUPABASE_URL || "https://dummy.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy";
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Obtenemos todos los usuarios y verificamos si tienen una cuenta de Google vinculada
  const { data: users, error } = await supabase
    .from("users")
    .select(`
      id,
      name,
      email,
      image,
      accounts (
        provider,
        refresh_token
      )
    `)
    .order("email", { ascending: true });

  const totalUsers = users?.length || 0;
  const connectedUsers = users?.filter(u => u.accounts && u.accounts.length > 0 && u.accounts[0].refresh_token)?.length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Clientes</h1>
        <p className="text-neutral-400 mt-1">Supervisa los accesos y tokens de Google Drive de tus clientes B2B.</p>
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
              ) : users?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">
                    Aún no hay clientes registrados.
                  </td>
                </tr>
              ) : (
                users?.map((user) => {
                  const hasToken = user.accounts && user.accounts.length > 0 && user.accounts[0].refresh_token;
                  
                  return (
                    <tr key={user.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=0D8ABC&color=fff`} 
                            alt={user.email} 
                            className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-800"
                          />
                          <div>
                            <p className="text-white font-medium">{user.name || "Sin nombre"}</p>
                            <p className="text-neutral-400 text-xs">{user.email}</p>
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
                          {user.id}
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
