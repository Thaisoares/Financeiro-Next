import { db } from "@/app/_lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Verifica se o usuário já existe
          const existingUser = await db.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Cria novo usuário se não existir
            const newUser = await db.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                googleAuthId: user.id,
              },
            });
            user.id = newUser.id;
          } else {
            user.id = existingUser.id;
          }

          return true;
        } catch (error) {
          console.error("Erro ao processar login:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // Add user ID to the token if user is authenticated
      if (account && user) {
        token.id = user.id; // Store the user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id!;

      const dbUser = await db.user.findUnique({
        where: { id: session.user.id },
      });
      session.user.isPremium = !!dbUser?.subscriptionId;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Custom sign-in page (optional)
    signOut: "/auth/signout", // Custom sign-out page (optional)
    error: "/auth/error", // Error page (optional)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
