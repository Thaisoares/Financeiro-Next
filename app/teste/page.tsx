// teste/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "../_components/ui/button";

const TestePage = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div>
      <li>Bem vindo {session?.user?.name}</li>
      <li>email: {session?.user?.email}</li>
      <Button onClick={handleSignOut}>Sing Out</Button>
    </div>
  );
};

export default TestePage;
