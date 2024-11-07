// components/SessionProviderWrapper.tsx

"use client"; // Marque este componente como Client Component

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
