import { db } from "@/app/_lib/prisma";
import { limitTransactions } from "./types";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LIMIT_TRANSACTIONS = 10;

export const getLimitTransactions = async (): Promise<limitTransactions> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const countCurrentMonthTransactions = await db.transaction.count({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  });

  return {
    limit: LIMIT_TRANSACTIONS,
    currentMonth: countCurrentMonthTransactions,
  };
};
