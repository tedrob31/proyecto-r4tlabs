import Link from 'next/link';
import { ChevronRight, Code, Zap, ShoppingCart, Globe2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-xl tracking-tighter">R4TLABS</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors">
            Agendar Llamada
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-sm text-neutral-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Empresa de Soluciones Tecnológicas en Perú
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-8 leading-[1.1]">
            Transformamos tu visión en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Software Escalar</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12">
            Implementación experta de software, automatización de procesos complejos y plataformas e-commerce diseñadas para el crecimiento B2B y corporativo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all">
              Iniciar Proyecto <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-full font-medium border border-neutral-800 hover:bg-neutral-900 transition-all">
              Explorar Servicios
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Nuestra Experiencia</h2>
            <p className="text-neutral-400 max-w-2xl">Soluciones de alto rendimiento diseñadas para resolver problemas reales de negocio y escalar operaciones.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="group p-8 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/50 to-neutral-950 hover:border-neutral-700 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Desarrollo de SaaS</h3>
              <p className="text-neutral-400 leading-relaxed">
                Construimos plataformas SaaS robustas y escalables con arquitecturas modernas (React, Next.js, Node) pensadas para alta disponibilidad.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group p-8 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/50 to-neutral-950 hover:border-neutral-700 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automatizaciones con n8n</h3>
              <p className="text-neutral-400 leading-relaxed">
                Conectamos tus herramientas y automatizamos flujos de trabajo complejos para reducir costos operativos y eliminar errores manuales.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group p-8 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/50 to-neutral-950 hover:border-neutral-700 transition-all">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">E-commerce para Mayoristas</h3>
              <p className="text-neutral-400 leading-relaxed">
                Desarrollamos catálogos digitales interactivos y portales B2B con gestión de inventario, integración ERP y pedidos al por mayor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-black pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <Globe2 className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-xl tracking-tighter">R4TLABS</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Agencia de desarrollo de software y automatización basada en Lima, Perú. Construyendo el futuro digital de las empresas.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold mb-4 text-sm">Compañía</h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Casos de Éxito</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 text-center text-neutral-600 text-sm">
          <p>© {new Date().getFullYear()} R4TLABS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
