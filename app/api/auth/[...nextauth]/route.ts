import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login", // Custom sign-in page (optional)
    signOut: "/auth/signout", // Custom sign-out page (optional)
    error: "/auth/error", // Error page (optional)
  },
});

export { handler as GET, handler as POST };
