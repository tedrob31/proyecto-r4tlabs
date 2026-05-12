import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfService() {
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
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Términos de Servicio</h1>
            <p className="text-neutral-400">Última actualización: {new Date().toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="prose prose-invert prose-blue max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar los servicios web, APIs e integraciones proporcionadas por <strong>R4TLABS</strong> (en adelante, "la Agencia"), usted acepta estar sujeto a los presentes Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Descripción del Servicio</h2>
            <p>
              R4TLABS provee servicios de desarrollo de software a medida, automatizaciones, e-commerce B2B y un sistema centralizado de identidad (R4TLABS Identity Server). Proveemos soluciones tecnológicas integrales que pueden requerir conexión con servicios de terceros, como Google Cloud, para la sincronización y almacenamiento de datos del cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Integraciones y APIs de Terceros</h2>
            <p>
              Nuestros servicios pueden utilizar integraciones con APIs de terceros (por ejemplo, Google Drive API). Al autorizar estas integraciones, el cliente comprende que la disponibilidad y correcto funcionamiento de las mismas depende de las políticas de dichos terceros. R4TLABS se compromete a cumplir estrictamente con las políticas de uso de datos de dichas plataformas, tal como se especifica en nuestra Política de Privacidad, pero no se hace responsable por caídas o cambios en los términos de proveedores externos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Propiedad Intelectual</h2>
            <p>
              A menos que se especifique lo contrario en un contrato por escrito, el código fuente base, las herramientas internas y la arquitectura del sistema proporcionados por R4TLABS son propiedad intelectual de la Agencia. Se otorga al cliente una licencia de uso de acuerdo con las condiciones estipuladas en el contrato de prestación de servicios individual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Limitación de Responsabilidad</h2>
            <p>
              R4TLABS no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo resultante de su acceso o uso (o incapacidad de acceso o uso) de los servicios, incluyendo la pérdida de beneficios, datos u otras pérdidas intangibles. Garantizamos el mayor esfuerzo para mantener la seguridad y disponibilidad de las plataformas, aplicando las mejores prácticas de la industria en nuestra infraestructura en la nube.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Terminación del Servicio</h2>
            <p>
              Podemos suspender o cancelar el acceso a nuestros servicios de inmediato, sin previo aviso o responsabilidad, por cualquier motivo, lo que incluye, entre otros, el incumplimiento de los Términos o la falta de pago de las obligaciones contractuales acordadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Cambios a los Términos</h2>
            <p>
              Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Al continuar accediendo o utilizando nuestro Servicio después de que esas revisiones entren en vigencia, usted acepta estar sujeto a los términos revisados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Contacto</h2>
            <p>
              Para cualquier consulta legal o técnica relacionada con estos Términos de Servicio, por favor contáctenos en:
            </p>
            <ul className="list-none mt-2 space-y-1">
              <li><strong>Email:</strong> legal@r4tlabs.com</li>
              <li><strong>Agencia:</strong> R4TLABS</li>
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
