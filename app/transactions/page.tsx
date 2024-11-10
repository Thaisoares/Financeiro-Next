import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const userId = session?.user.id;
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;