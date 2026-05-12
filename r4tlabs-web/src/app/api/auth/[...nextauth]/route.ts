import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Custom redirect logic para manejar redirecciones a diferentes subdominios de clientes
      // por ejemplo: *.catalogo.com basándonos en el parámetro 'state' si se pasa.
      
      // Si la URL es la URL base, la enviamos allí
      if (url.startsWith(baseUrl)) return url;
      // Permite URLs relativas
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      
      // Lógica de validación de dominios permitidos (ej: subdominios de clientes)
      try {
        const parsedUrl = new URL(url);
        // Aquí deberías validar que el hostname termina en los dominios permitidos de tus clientes
        // if (parsedUrl.hostname.endsWith('.catalogo.com') || parsedUrl.hostname.endsWith('.r4tlabs.com')) {
        //   return url;
        // }
      } catch (error) {
        console.error("Invalid URL in redirect callback", error);
      }
      
      return baseUrl;
    },
    async jwt({ token, account }) {
      // Guardar tokens si se acaba de hacer login
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Pasar token a la sesión
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
