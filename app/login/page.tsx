import Image from "next/image";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { LockIcon, MailIcon } from "lucide-react";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0f172a] p-4">
      <Card className="w-full max-w-md border-[#334155] bg-[#1e293b]">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Image src="/logo.svg" width={173} height={39} alt="logo" />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-[#94a3b8]">Sign in to your account</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-5 w-5 text-[#94a3b8]" />
              <Input
                type="email"
                placeholder="Email"
                className="border-[#334155] bg-[#0f172a] pl-10 text-white placeholder:text-[#94a3b8]"
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-3 top-3 h-5 w-5 text-[#94a3b8]" />
              <Input
                type="password"
                placeholder="Password"
                className="border-[#334155] bg-[#0f172a] pl-10 text-white placeholder:text-[#94a3b8]"
              />
            </div>
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
            className="w-full bg-[#38bdf8] text-white hover:bg-[#38bdf8]/90"
          >
            Sign in
          </Button>

          <div className="text-center text-sm text-[#94a3b8]">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-[#38bdf8] hover:underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
