import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const authOptions: NextAuthOptions = {
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
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname.endsWith('.catalogo.com') || parsedUrl.hostname.endsWith('.r4tlabs.com')) {
          return url;
        }
      } catch (error) {
        console.error("Invalid URL in redirect callback", error);
      }
      return baseUrl;
    },
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
