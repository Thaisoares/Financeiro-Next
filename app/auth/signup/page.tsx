// pages/signup.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../_components/ui/card";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Input } from "../../_components/ui/input";
import { Button } from "../../_components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // If user is already logged in, redirect to dashboard
  if (session) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Sign in the user after successful signup
        router.push("/auth/login");
      } else {
        // Handle error - you might want to show an error message
        console.error(data.message);
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
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-[#94a3b8]">Sign up for your account</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-[#94a3b8]" />
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[#334155] bg-[#0f172a] pl-10 text-white placeholder:text-[#94a3b8]"
              />
            </div>

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

            <Button
              variant={"outline"}
              type="submit"
              disabled={loading}
              className="w-full bg-[#38bdf8] text-white hover:bg-[#38bdf8]/90"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-[#94a3b8]">
            Already have an account?{" "}
            <a href="/login" className="text-[#38bdf8] hover:underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
