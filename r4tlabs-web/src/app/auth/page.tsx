import { ShieldCheck, Lock, Server } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      <div className="max-w-md w-full bg-black border border-neutral-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">R4TLABS Identity Server</h1>
          
          <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
            Este es el nodo central de autenticación segura para los servicios e integraciones de R4TLABS.
          </p>

          <div className="w-full space-y-3">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex items-center gap-4 text-left">
              <Lock className="w-5 h-5 text-neutral-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Seguridad OAuth 2.0</p>
                <p className="text-xs text-neutral-500">Gestión de identidad delegada</p>
              </div>
            </div>
            
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex items-center gap-4 text-left">
              <Server className="w-5 h-5 text-neutral-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Central de Microservicios</p>
                <p className="text-xs text-neutral-500">Enrutamiento interno seguro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-neutral-600 text-xs mt-8 font-mono">
        Status: <span className="text-emerald-500">Active</span> | Node: Auth-01
      </p>
    </div>
  );
}
