import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { getLimitTransactions } from "../_data/get-limit-transactions";

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }
  const userId = session?.user.id;
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });
  const { limit, currentMonth } = await getLimitTransactions();
  const userIsOverLimit = currentMonth >= limit;

  return (
    <>
      <Navbar session={session} />
      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            canUserAddTransactions={session.user.isPremium || !userIsOverLimit}
          />
        </div>
        <ScrollArea>
          {transactions.length == 0 ? (
            <div className="flex content-center justify-center pt-6">
              <p className="text-center text-gray-500">
                Ainda não tem nenhuma transação registrada.
              </p>
            </div>
          ) : (
            <DataTable columns={transactionColumns} data={transactions} />
          )}
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
