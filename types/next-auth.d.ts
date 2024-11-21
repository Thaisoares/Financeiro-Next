import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    isPremium: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add the id property to the JWT interface
  }
}
