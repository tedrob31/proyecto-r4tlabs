import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/drive.readonly"
        }
      }
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL || "https://dummy.supabase.co",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy",
  }),
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Custom redirect logic para manejar redirecciones a diferentes subdominios de clientes
      // Ejemplo: tiendajuan.catalogo.com/admin
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      
      try {
        const parsedUrl = new URL(url);
        // Permitimos redirecciones a los dominios de los clientes que terminan en .catalogo.com o .r4tlabs.com
        if (parsedUrl.hostname.endsWith('.catalogo.com') || parsedUrl.hostname.endsWith('.r4tlabs.com')) {
          return url;
        }
      } catch (error) {
        console.error("Invalid URL in redirect callback", error);
      }
      return baseUrl;
    },
    async session({ session, user }: any) {
      // El user ID viene de Supabase gracias al adaptador
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
