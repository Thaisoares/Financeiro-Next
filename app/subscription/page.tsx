import Navbar from "../_components/navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <>
      <Navbar session={session} />
    </>
  );
};

export default SubscriptionPage;
