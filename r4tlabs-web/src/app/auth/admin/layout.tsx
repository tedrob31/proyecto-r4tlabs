import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 flex flex-col selection:bg-blue-500/30">
      <nav className="border-b border-neutral-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold tracking-tight">R4TLABS Panel</span>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-400 hidden sm:block">
                {user.email}
              </div>
              <form action="/api/auth/signout" method="post">
                <button 
                  type="submit"
                  className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
