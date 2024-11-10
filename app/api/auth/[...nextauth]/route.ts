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
    async jwt({ token, user, account }) {
      // Add user ID to the token if user is authenticated
      if (account && user) {
        token.id = user.id; // Store the user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session object
      session.user.id = token.id!; // Attach the user ID to the session
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
