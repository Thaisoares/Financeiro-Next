"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

interface props {
  session: Session;
}

const Navbar = ({ session }: props) => {
  const pathName = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1 pr-10">
          <Image src="/logo.svg" width={55} height={55} alt="Logo" />
          <h1 className="text-pretty text-xl font-semibold text-[#38bdf8]">
            Finanzas
          </h1>
        </div>
        <Link
          href="/"
          className={
            pathName === "/"
              ? "cursor-default text-sm font-semibold text-muted-foreground"
              : "text-sm text-muted-foreground hover:underline"
          }
        >
          Dashboard
        </Link>

        <Link
          href="/transactions"
          className={
            pathName === "/transactions"
              ? "cursor-default text-sm font-semibold text-muted-foreground"
              : "text-sm text-muted-foreground hover:underline"
          }
        >
          Transações
        </Link>

        <Link
          href="/subscription"
          className={
            pathName === "/subscription"
              ? "cursor-default text-sm font-semibold text-muted-foreground"
              : "text-sm text-muted-foreground hover:underline"
          }
        >
          Assinatura
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">{session.user.name}</span>
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt="user logo"
            className="h-9 w-9 rounded-full border border-gray-300"
          />
        ) : (
          <div>👤</div>
        )}
        <Button variant="outline" onClick={() => handleSignOut}>
          Sing Out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
