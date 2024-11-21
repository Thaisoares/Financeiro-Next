import Navbar from "../_components/navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import AcquirePlanButton from "./_components/acquire-plan-button";
import ActiveBadge from "./_components/active-badge";

const SubscriptionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }
  const userIsPremium = session.user.isPremium;

  return (
    <>
      <Navbar session={session} />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {!userIsPremium && <ActiveBadge />}
              <h2 className="justify-center text-center">Plano Básico</h2>
              <div className="flex items-center justify-center">
                <span className="pr-2 text-4xl">R$</span>
                <span className="text-6xl font-bold">0</span>
                <span className="pr-2 text-4xl">,00</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-10">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por dia</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="text-muted-foreground" />
                <p>Relatório de IA</p>
              </div>
              <div className="mt-2 flex w-full justify-center">
                <Button
                  variant="outline"
                  className="no-hover w-[300px] rounded-full border-primary text-primary"
                >
                  Plano atual
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {userIsPremium && <ActiveBadge />}
              <h2 className="justify-center text-center">Plano Premium</h2>
              <div className="flex items-center justify-center">
                <span className="pr-2 text-4xl">R$</span>
                <span className="text-6xl font-bold">9</span>
                <span className="pr-2 text-4xl">,99</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-10">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatório de IA</p>
              </div>
              <div className="mt-2 flex w-full justify-center">
                <AcquirePlanButton
                  userIsPremium={userIsPremium}
                  userEmail={session.user.email}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
