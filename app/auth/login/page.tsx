// pages/login.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../_components/ui/card";
import { LockIcon, MailIcon } from "lucide-react";
import { Input } from "../../_components/ui/input";
import { Button } from "../../_components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "../../_components/ui/separator";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // If user is already logged in, redirect to dashboard
  if (session) {
    router.push("/teste");
    return null;
  }

  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Handle error - you might want to show an error message
        console.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0f172a] p-4">
      <Card className="w-full max-w-md border-[#334155] bg-[#1e293b]">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Image src="/logo.svg" width={173} height={39} alt="logo" />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-[#94a3b8]">Sign in to your account</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-5 w-5 text-[#94a3b8]" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#334155] bg-[#0f172a] pl-10 text-white placeholder:text-[#94a3b8]"
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-3 top-3 h-5 w-5 text-[#94a3b8]" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#334155] bg-[#0f172a] pl-10 text-white placeholder:text-[#94a3b8]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-[#334155] bg-[#0f172a]"
                />
                <span className="text-sm text-[#94a3b8]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#38bdf8] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              variant={"outline"}
              type="submit"
              disabled={loading}
              className="w-full bg-[#38bdf8] text-white hover:bg-[#38bdf8]/90"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1e293b] px-2 text-[#94a3b8]">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => signIn("google")}
              className="border-[#334155] text-black"
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => signIn("microsoft")}
              className="border-[#334155] text-black"
            >
              Microsoft
            </Button>
          </div>

          <div className="text-center text-sm text-[#94a3b8]">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#38bdf8] hover:underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
