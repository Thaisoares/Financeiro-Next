import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { formatCurrency } from "@/app/_utils/currency";
import { TransactionTypeColors } from "@/types/typesColors";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const getAmountPrefix = (transaction: Transaction) => {
  if (transaction.type === TransactionType.DEPOSIT) return "+";
  return "-";
};

interface props {
  transactions: Transaction[];
}

const LastTransactions = ({ transactions }: props) => {
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white bg-opacity-[6%] p-3">
                <Image
                  src={`/${transaction.paymentMethod}.svg`}
                  alt={transaction.paymentMethod}
                  height={20}
                  width={20}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <p
              className={`text-sm font-bold ${TransactionTypeColors[transaction.type].text}`}
            >
              {`${getAmountPrefix(transaction)} ${formatCurrency(Number(transaction.amount))}`}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
