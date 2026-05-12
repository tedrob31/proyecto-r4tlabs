import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 selection:bg-blue-500/30">
      <nav className="border-b border-neutral-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-2xl border border-blue-500/20">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Política de Privacidad</h1>
            <p className="text-neutral-400">Última actualización: {new Date().toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="prose prose-invert prose-blue max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Identidad del Responsable</h2>
            <p>
              El presente documento establece la Política de Privacidad de <strong>R4TLABS</strong> (en adelante, "la Agencia", "nosotros" o "nuestro"), agencia de desarrollo de software con sede en Perú. Somos los responsables del tratamiento de los datos recopilados a través de nuestras aplicaciones y servicios web, incluyendo nuestras integraciones con plataformas de terceros como Google Cloud.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Uso de la API de Google Drive</h2>
            <p>
              Nuestra aplicación utiliza la <strong>API de Google Drive (Google Drive API - Read-only)</strong> para proporcionar servicios de sincronización automatizada para nuestros clientes empresariales.
            </p>
            <h3 className="text-lg font-medium text-white mt-6 mb-2">¿Qué datos solicitamos?</h3>
            <p>
              Al conectar su cuenta de Google con nuestros servicios, solicitamos acceso de <strong>solo lectura</strong> a sus archivos de Google Drive mediante el alcance (scope) <code>https://www.googleapis.com/auth/drive.readonly</code>. Guardamos de forma segura los <strong>tokens de acceso y actualización (access tokens y refresh tokens)</strong> delegados por OAuth2 para mantener la conexión activa.
            </p>
            <h3 className="text-lg font-medium text-white mt-6 mb-2">¿Para qué usamos estos datos?</h3>
            <p>
              El uso de la información recibida de las APIs de Google por parte de R4TLABS cumplirá con la <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Política de Datos de Usuario de los Servicios API de Google</a>, incluidos los requisitos de uso limitado. Específicamente utilizamos este acceso para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Sincronizar fotos de productos</strong> desde carpetas específicas de Google Drive hacia las bases de datos de los catálogos web y plataformas E-commerce desarrolladas para nuestros clientes.</li>
              <li>Automatizar la carga de recursos multimedia (imágenes) para evitar procesos manuales, optimizando la gestión de inventarios visuales.</li>
            </ul>
            <p className="mt-4">
              <strong>Nota importante:</strong> Nosotros NO utilizamos, compartimos, transferimos ni vendemos los datos de Google Drive para fines publicitarios, de análisis de comportamiento, o cualquier otro fin ajeno a la sincronización expresa solicitada por el cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Almacenamiento y Seguridad de Datos</h2>
            <p>
              Los tokens de autenticación se almacenan cifrados en nuestras bases de datos seguras. Solo los procesos automatizados del servidor acceden a estos tokens en el momento exactos de la sincronización de imágenes. Implementamos estrictos controles de seguridad, cifrado en tránsito (HTTPS/TLS) y en reposo para proteger la integridad de esta información.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Retención y Revocación de Acceso</h2>
            <p>
              Los tokens y la vinculación a Google Drive se retendrán únicamente mientras el cliente mantenga activo el servicio de sincronización de catálogos web.
            </p>
            <h3 className="text-lg font-medium text-white mt-6 mb-2">¿Cómo revocar el acceso?</h3>
            <p>
              El usuario tiene total control sobre sus datos y puede revocar el acceso de nuestra aplicación en cualquier momento. Para hacerlo:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>Visite la página de <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Permisos de cuenta de Google</a>.</li>
              <li>Busque la aplicación "R4TLABS Identity Server" o el nombre del Catálogo asignado.</li>
              <li>Haga clic en la aplicación y seleccione "Retirar acceso" (Remove Access).</li>
            </ol>
            <p className="mt-4">
              Al realizar esta acción, nuestra aplicación perderá inmediatamente la capacidad de leer sus carpetas y se detendrá la sincronización automática de fotos. Adicionalmente, puede contactarnos a <code>privacy@r4tlabs.com</code> para solicitar la eliminación completa de los tokens en nuestros servidores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Cambios en la Política de Privacidad</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Notificaremos a nuestros clientes activos sobre cualquier cambio significativo por correo electrónico o a través de nuestro portal antes de que los cambios entren en vigor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Contacto</h2>
            <p>
              Si tiene preguntas o inquietudes sobre esta política de privacidad o sobre el manejo de sus datos y tokens de Google, puede comunicarse con nuestro Oficial de Privacidad a través de:
            </p>
            <ul className="list-none mt-2 space-y-1">
              <li><strong>Email:</strong> privacy@r4tlabs.com</li>
              <li><strong>Empresa:</strong> R4TLABS</li>
            </ul>
          </section>
        </div>
      </main>
      
      <footer className="border-t border-neutral-900 bg-black py-8 mt-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} R4TLABS. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
