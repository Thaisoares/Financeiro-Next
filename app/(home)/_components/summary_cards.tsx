import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface props {
  userId: string;
  month: string;
  year: string;
}

const SummaryCards = async ({ userId, month, year }: props) => {
  const nextMonth = month == "12" ? "01" : String(Number(month) + 1);
  const filterDate = {
    userId,
    date: {
      gte: new Date(`${year}-${month}-01`),
      lt: new Date(`${year}-${nextMonth}-01`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...filterDate,
          type: "DEPOSIT",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...filterDate,
          type: "EXPENSE",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...filterDate,
          type: "INVESTMENT",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - expensesTotal - investmentsTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<PiggyBankIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<WalletIcon size={14} className="text-purple-800" />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={14} className="text-green-600" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={14} className="text-red-500" />}
          title="Gasto"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
