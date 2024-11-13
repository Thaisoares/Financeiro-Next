import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export const getDashboardData = async (
  month: string,
  year: string,
  userId: string,
) => {
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

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...filterDate,
        },
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]:
      transactionsTotal == 0
        ? 0
        : Math.round((Number(depositsTotal || 0) / transactionsTotal) * 100),
    [TransactionType.EXPENSE]:
      transactionsTotal == 0
        ? 0
        : Math.round((Number(expensesTotal || 0) / transactionsTotal) * 100),
    [TransactionType.INVESTMENT]:
      transactionsTotal == 0
        ? 0
        : Math.round((Number(investmentsTotal || 0) / transactionsTotal) * 100),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...filterDate,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((group) => ({
    category: group.category,
    totalAmount: Number(group._sum.amount),
    percentageOfTotal: Number(
      expensesTotal == 0
        ? 0
        : Math.round((100 * Number(group._sum.amount)) / expensesTotal),
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where: {
      ...filterDate,
    },
    orderBy: { date: "desc" },
    take: 20,
  });

  return {
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    balance,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
